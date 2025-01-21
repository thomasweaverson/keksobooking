const typeFilter = document.querySelector('#housing-type');
const priceFilter = document.querySelector('#housing-price');
const roomsFilter = document.querySelector('#housing-rooms');
const guestsFilter = document.querySelector('#housing-guests');
const featuresFilter = document.querySelectorAll('[name="features"]');

const getFilters = () => {
  const filters = {
    type: typeFilter.value,
    price: priceFilter.value,
    rooms: roomsFilter.value,
    guests: guestsFilter.value,
    features: Array.from(featuresFilter)
      .filter((feature) => feature.checked)
      .map((feature) => feature.value),
  };
  return filters;
};

const filterByType = (offersArray, type) => {
  if (type === 'any') {
    return offersArray;
  }
  return offersArray.filter((offer) => offer.offer.type === type);
};
const filterByPrice = (offersArray, priceLevel) => {
  if (priceLevel === 'any') {
    return offersArray;
  }
  if (priceLevel === 'low') {
    return offersArray.filter((offer) => offer.offer.price < 10000);
  }
  if (priceLevel === 'middle') {
    return offersArray.filter(
      (offer) => offer.offer.price >= 10000 && offer.offer.price <= 50000
    );
  }
  if (priceLevel === 'high') {
    return offersArray.filter((offer) => offer.offer.price > 50000);
  }
};
const filterByRooms = (offersArray, roomsNumber) => {
  if (roomsNumber === 'any') {
    return offersArray;
  }
  return offersArray.filter((offer) => +offer.offer.rooms === +roomsNumber);
};
const filterByGuests = (offersArray, guestsNumber) => {
  if (guestsNumber === 'any') {
    return offersArray;
  }
  return offersArray.filter((offer) => +offer.offer.guests === +guestsNumber);
};
const filterByFeatures = (offersArray, features) => {
  if (features.length === 0) {
    return offersArray;
  }
  const result = offersArray.filter((offer) =>
    features.every((feature) => {
      if (offer.offer && Array.isArray(offer.offer.features)) {
        return offer.offer.features.includes(feature);
      } else {
        return false;
      }
    })
  );
  return result;
};

const filterSimilarOffers = (offers) => {
  const filters = getFilters();
  let filteredOffers = offers.slice();
  filteredOffers = filterByType(filteredOffers, filters.type);
  filteredOffers = filterByPrice(filteredOffers, filters.price);
  filteredOffers = filterByRooms(filteredOffers, filters.rooms);
  filteredOffers = filterByGuests(filteredOffers, filters.guests);
  filteredOffers = filterByFeatures(filteredOffers, filters.features);
  return filteredOffers;
};

export { filterSimilarOffers };
