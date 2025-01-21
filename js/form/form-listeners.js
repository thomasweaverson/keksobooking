import { reinitPristine, validateForm } from './form-validator.js';

import { updatePriceSlider } from './price-slider.js';
import { MIN_PRICE_BY_HOUSING_TYPES } from './form-main.js';

const timeinField = document.querySelector('[name=timein]');
const timeoutField = document.querySelector('[name=timeout]');
const priceField = document.querySelector('[name=price]');
const capacityField = document.querySelector('[name=capacity]');
const sliderElement = document.querySelector('.ad-form__slider');

const onRoomsChange = () => validateForm(capacityField);

const onTimeinChange = () => {
  timeoutField.value = timeinField.value;
};

const onTimeoutChange = () => {
  timeinField.value = timeoutField.value;
};

const onTypeChange = (evt) => {
  const minValue = MIN_PRICE_BY_HOUSING_TYPES[evt.target.value];
  priceField.placeholder = minValue;
  priceField.min = minValue;
  updatePriceSlider(sliderElement, minValue);
  reinitPristine();
  validateForm();
};

const onPriceFieldChange = () => {
  sliderElement.noUiSlider.set(priceField.value);
  validateForm();
};

const onAvatarChange = () => {
  const avatarChooseInput = document.querySelector('.ad-form-header__input');
  const avatarPreviewImg = document.querySelector(
    '.ad-form-header__preview img'
  );
  const file = avatarChooseInput.files[0];
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    avatarPreviewImg.src = reader.result;
  });
  reader.readAsDataURL(file);
};

const onPhotoChange = () => {
  const photoChooseInput = document.querySelector('.ad-form__input');
  const photoPreviewImg = document.querySelector('.ad-form__photo img');

  const file = photoChooseInput.files[0];
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    photoPreviewImg.src = reader.result;
  });
  reader.readAsDataURL(file);
};


export {
  onRoomsChange,
  onTimeinChange,
  onTimeoutChange,
  onTypeChange,
  onPriceFieldChange,
  onAvatarChange,
  onPhotoChange
};
