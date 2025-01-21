const HOUSING_TYPES = {
  bungalow: 'Бунгало',
  flat: 'Квартира',
  hotel: 'Отель',
  house: 'Дом',
  palace: 'Дворец',
};

const getRoomDeclension = (rooms) => {
  if (rooms % 10 === 1) {
    return 'комната';
  }
  if (rooms % 10 >= 2 && rooms % 10 <= 4) {
    return 'комнаты';
  }
  return 'комнат';
};

const getBalloonCardTemplate = () =>
  document
    .querySelector('#card')
    .content.querySelector('.popup')
    .cloneNode(true);

const getCapacityText = (rooms, guests) =>
  `${rooms} ${getRoomDeclension(rooms)} для ${guests} ${
    guests === 1 ? 'гостя' : 'гостей'
  }`;

const renderFeatures = (featuresListElement, features) => {
  if (!features) {
    featuresListElement.remove();
    return;
  }
  const featuresList = featuresListElement.querySelectorAll('.popup__feature');
  const featureModifiers = features.map(
    (feature) => `popup__feature--${feature}`
  );
  featuresList.forEach((featureElement) => {
    const modifier = featureElement.classList[1];
    if (!featureModifiers.includes(modifier)) {
      featureElement.remove();
    }
  });
};

const renderPhotos = (photosElement, photos) => {
  if (!photos) {
    photosElement.remove();
    return;
  }
  const photosFragment = document.createDocumentFragment();
  const photoTemplate = photosElement
    .querySelector('.popup__photo')
    .cloneNode(true);
  photosElement.innerHTML = '';
  photos.forEach((photo) => {
    const photoElement = photoTemplate.cloneNode(true);
    photoElement.src = photo;
    photosFragment.append(photoElement);
  });
  photosElement.append(photosFragment);
};

const renderDescription = (descriptionElement, description) => {
  if (!description) {
    descriptionElement.remove();
    return;
  }
  descriptionElement.textContent = description;
};

const fillBalloonCard = (cardElement, author, offer) => {
  const {
    title,
    address,
    price,
    type,
    rooms,
    guests,
    checkin,
    checkout,
    description,
    features,
    photos,
  } = offer;

  const popupAvatar = cardElement.querySelector('.popup__avatar');
  const popupTitle = cardElement.querySelector('.popup__title');
  const popupAddress = cardElement.querySelector('.popup__text--address');
  const popupPrice = cardElement.querySelector('.popup__text--price');
  const popupType = cardElement.querySelector('.popup__type');
  const popupCapacity = cardElement.querySelector('.popup__text--capacity');
  const popupTime = cardElement.querySelector('.popup__text--time');
  const popupDescription = cardElement.querySelector('.popup__description');
  const popupFeatures = cardElement.querySelector('.popup__features');
  const popupPhotos = cardElement.querySelector('.popup__photos');

  popupAvatar.src = author.avatar;
  popupTitle.textContent = title;
  popupAddress.textContent = address;
  popupPrice.textContent = `${price} ₽/ночь`;
  popupType.textContent = HOUSING_TYPES[type];
  popupCapacity.textContent = getCapacityText(rooms, guests);
  popupTime.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  renderDescription(popupDescription, description);
  renderFeatures(popupFeatures, features);
  renderPhotos(popupPhotos, photos);

  return cardElement;
};

const getBalloonCard = ({ author, offer }) => fillBalloonCard(getBalloonCardTemplate(), author, offer);

export { getBalloonCard };
