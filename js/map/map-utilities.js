import { getBalloonCard } from './get-balloon-card.js';
import {
  map,
  ONLOAD_VIEW,
  MAP_SCALE,
  userMarker,
} from './map.js';

const degreesToRadians = (degrees) => degrees * (Math.PI / 180);

const calculateDistance = (latitude1, longitude1, latitude2, longitude2) => {
  const earthRadius = 6371;
  const radianLatitudeDifference = degreesToRadians(latitude2 - latitude1);
  const radianLongitudeDifference = degreesToRadians(longitude2 - longitude1);
  const a =
    Math.sin(radianLatitudeDifference / 2) *
      Math.sin(radianLatitudeDifference / 2) +
    Math.cos(degreesToRadians(latitude1)) *
      Math.cos(degreesToRadians(latitude2)) *
      Math.sin(radianLongitudeDifference / 2) *
      Math.sin(radianLongitudeDifference / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;
  return distance;
};

const getClosestObjects = (userLatitude, userLongitude, objectsArray) => {
  const copiedArray = [...objectsArray];
  copiedArray.forEach((object) => {
    const {
      location: { lat, lng },
    } = object;
    object.distance = calculateDistance(userLatitude, userLongitude, lat, lng);
  });

  copiedArray.sort((object1, object2) => object1.distance - object2.distance);
  return copiedArray.slice(0, 10);
};

const createMarker = (offer, layer, markerIcon) => {
  const marker = L.marker(
    { lat: offer.location.lat, lng: offer.location.lng },
    {
      icon: markerIcon,
    }
  );
  marker.addTo(layer);
  marker.bindPopup(getBalloonCard(offer));
};

const renderOffers = (ads, layer, leafletMarkerIcon) => {
  ads.forEach((offer) => {
    createMarker(offer, layer, leafletMarkerIcon);
  });
};

const resetMap = () => {
  const addressField = document.querySelector('[name=address]');
  addressField.value = `${ONLOAD_VIEW.lat}, ${ONLOAD_VIEW.lng}`;

  map.setView(ONLOAD_VIEW, MAP_SCALE);
  userMarker.setLatLng(ONLOAD_VIEW);
  userMarker.fire('moveend');
};

export { getClosestObjects, renderOffers, resetMap };
