import { createPriceSlider } from './price-slider.js';
import { onFormSubmit, onFormReset } from './form-utilities.js';
import {
  onRoomsChange,
  onTimeinChange,
  onTimeoutChange,
  onTypeChange,
  onPriceFieldChange,
  onAvatarChange,
  onPhotoChange,
} from './form-listeners.js';

const MIN_PRICE_BY_HOUSING_TYPES = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const form = document.querySelector('.ad-form');
const priceField = document.querySelector('[name=price]');
const typeField = document.querySelector('[name=type]');
const roomsField = document.querySelector('[name=rooms]');
const timeinField = document.querySelector('[name=timein]');
const timeoutField = document.querySelector('[name=timeout]');
const sliderElement = document.querySelector('.ad-form__slider');
const avatarLoader = document.querySelector('.ad-form-header__input');
const photoLoader = document.querySelector('.ad-form__input');

roomsField.addEventListener('change', onRoomsChange);

timeinField.addEventListener('input', onTimeinChange);

timeoutField.addEventListener('input', onTimeoutChange);

createPriceSlider(sliderElement);

typeField.addEventListener('change', onTypeChange);

priceField.addEventListener('change', onPriceFieldChange);

avatarLoader.addEventListener('change', onAvatarChange);

photoLoader.addEventListener('change', onPhotoChange);

form.addEventListener('submit', onFormSubmit);
form.addEventListener('reset', onFormReset);

export { MIN_PRICE_BY_HOUSING_TYPES };
