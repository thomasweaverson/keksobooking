import { MIN_PRICE_BY_HOUSING_TYPES } from './form-main.js';
import { validateForm } from './form-validator.js';

const MAX_PRICE = 100000;

const typeField = document.querySelector('[name=type]');
const priceField = document.querySelector('[name=price]');

const getPriceSliderStartValue = () =>
  MIN_PRICE_BY_HOUSING_TYPES[typeField.value];

const setPriceSliderActiveMode = (sliderElement, isActive = true) => {
  if (isActive) {
    sliderElement.removeAttribute('disabled', true);
  } else {
    sliderElement.setAttribute('disabled', true);
  }
};

const createPriceSlider = (sliderElement) => {
  noUiSlider.create(sliderElement, {
    range: {
      min: getPriceSliderStartValue(),
      max: MAX_PRICE,
    },
    start: getPriceSliderStartValue(),
    step: 100,
    connect: 'lower',
    format: {
      to: (value) => value.toFixed(2),
      from: (value) => parseFloat(value),
    },
  });

  sliderElement.noUiSlider.on('update', () => {
    priceField.value = +sliderElement.noUiSlider.get();
    validateForm(priceField);
  });
};

const updatePriceSlider = (sliderElement, min = 0, max = MAX_PRICE) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
  });
};

export {
  createPriceSlider,
  setPriceSliderActiveMode,
  updatePriceSlider,
  getPriceSliderStartValue,
};
