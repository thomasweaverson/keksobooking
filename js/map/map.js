import { createDataHandler } from '../api/api.js';
import { activateApp } from '../app-activity-controller.js';
import { filterSimilarOffers } from '../filters/filters-main.js';
import { debounce } from '../utilities.js';

import { getClosestObjects, renderOffers } from './map-utilities.js';
import { showDownloadErrorNotice } from './map-offers-download-error.js';

const ONLOAD_VIEW = { lat: 35.681729, lng: 139.753927 };
const MAP_SCALE = 13;

const dataHandler = createDataHandler();

const addressField = document.querySelector('[name=address]');
const filterForm = document.querySelector('.map__filters');

const userMarkerIcon = L.icon({
  iconUrl: '/keksobooking/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const defaultMarkerIcon = L.icon({
  iconUrl: '/keksobooking/img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
const map = L.map('map-canvas');
const offersLayer = L.layerGroup().addTo(map);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const userMarker = L.marker(ONLOAD_VIEW, {
  draggable: true,
  icon: userMarkerIcon,
});

userMarker.addTo(map);

userMarker.on('moveend', (evt) => {
  const lat = evt.target.getLatLng().lat;
  const lng = evt.target.getLatLng().lng;
  addressField.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  const offers = dataHandler.useData();
  offersLayer.clearLayers();
  renderOffers(
    getClosestObjects(lat, lng, offers),
    offersLayer,
    defaultMarkerIcon
  );
});

const onDownloadSuccess = async (data) => {
  await renderOffers(
    getClosestObjects(ONLOAD_VIEW.lat, ONLOAD_VIEW.lng, data),
    offersLayer,
    defaultMarkerIcon
  );
  activateApp();
};

const onDownloadError = (message) => {
  showDownloadErrorNotice(message);
  activateApp(false);
};

const onFilterFormChange = () => {
  const userMarkerCoordinates = userMarker.getLatLng();
  const filteredOffers = filterSimilarOffers(dataHandler.useData());
  const closestOffers = getClosestObjects(
    userMarkerCoordinates.lat,
    userMarkerCoordinates.lng,
    filteredOffers
  );
  offersLayer.clearLayers();
  renderOffers(closestOffers, offersLayer, defaultMarkerIcon);
};

map
  .on('load', async () => {
    await dataHandler.getData(onDownloadSuccess, onDownloadError);
    const lat = ONLOAD_VIEW.lat.toFixed(5);
    const lng = ONLOAD_VIEW.lng.toFixed(5);
    addressField.value = `${lat}, ${lng}`;
    filterForm.addEventListener('change', debounce(onFilterFormChange, 500));
  })
  .setView(ONLOAD_VIEW, MAP_SCALE);

export {
  map,
  userMarker,
  defaultMarkerIcon,
  offersLayer,
  ONLOAD_VIEW,
  MAP_SCALE,
};
