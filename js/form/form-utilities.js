import {
  hide,
  show,
  isAnyModalShown,
  isEscapeKey,
  blockBodyScroll,
  unblockBodyScroll,
} from '../utilities.js';

import { validateForm, resetValidation } from './form-validator.js';
import { getPriceSliderStartValue, updatePriceSlider } from './price-slider.js';
import { sendFormData } from '../api/api.js';
import { resetMap } from '../map/map-utilities.js';

const createFormModal = (id) => {
  const template = document.querySelector(`#${id}`).content;
  const clone = document.importNode(template, true);
  hide(clone.querySelector('.modal'));
  document.body.appendChild(clone);
};

const showFormSuccessModal = () => {
  const successModal = document.querySelector('.success');
  show(successModal);
  blockBodyScroll();
};

const showFormErrorModal = () => {
  const errorModal = document.querySelector('.error');
  show(errorModal);
  blockBodyScroll();
};

const hideModals = () => {
  const modals = document.querySelectorAll('.modal');
  Array.from(modals).forEach((el) => {
    if (!el.classList.contains('hidden')) {
      hide(el);
    }
  });
  unblockBodyScroll();
};

const initPopupsController = () => {
  document.addEventListener('DOMContentLoaded', () => {
    createFormModal('success');
    createFormModal('error');
  });
  document.addEventListener('keydown', (evt) => {
    if (!isAnyModalShown || !isEscapeKey(evt)) {
      return;
    }
    hideModals();
  });
  document.addEventListener('click', () => {
    if (!isAnyModalShown) {
      return;
    }
    hideModals();
  });
};

const blockSubmitButton = () => {
  const submitButton = document.querySelector('.ad-form__submit');
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  const submitButton = document.querySelector('.ad-form__submit');
  submitButton.disabled = false;
};

const resetForm = () => {
  const titleField = document.querySelector('[name=title]');
  const roomsField = document.querySelector('[name=rooms]');
  const capacityField = document.querySelector('[name=capacity]');
  const timeinField = document.querySelector('[name=timein]');
  const timeoutField = document.querySelector('[name=timeout]');
  const typeField = document.querySelector('[name=type]');
  const priceField = document.querySelector('[name=price]');
  const features = document.querySelectorAll('.features__checkbox');
  const descriptionField = document.querySelector('[name=description]');

  const sliderElement = document.querySelector('.ad-form__slider');

  titleField.value = '';
  typeField.value = 'hotel';
  timeinField.value = '12:00';
  timeoutField.value = '12:00';
  roomsField.value = '1';
  capacityField.value = '1';
  Array.from(features).forEach((feature) => {
    feature.checked = false;
  });
  descriptionField.value = '';

  updatePriceSlider(sliderElement, getPriceSliderStartValue());
  priceField.value = getPriceSliderStartValue();
  sliderElement.noUiSlider.set(priceField.value);

  resetValidation();
};

const resetApp = () => {
  resetForm();
  resetMap();
};

const onFormSubmit = async (evt) => {
  evt.preventDefault();
  const isValid = validateForm();
  if (isValid) {
    blockSubmitButton();
    await sendFormData(
      () => {
        showFormSuccessModal();
        resetApp();
      },
      showFormErrorModal,
      new FormData(evt.target)
    );
    unblockSubmitButton();
  }
};

const onFormReset = (evt) => {
  evt.preventDefault();
  resetApp();
};

export {
  initPopupsController,
  showFormSuccessModal,
  showFormErrorModal,
  onFormSubmit,
  onFormReset,
};
