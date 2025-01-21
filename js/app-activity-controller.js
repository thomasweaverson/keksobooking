import { setPriceSliderActiveMode } from './form/price-slider.js';

const form = document.querySelector('.ad-form');
const filtersForm = document.querySelector('.map__filters');
const priceSliderElement = document.querySelector('.ad-form__slider');

// const deactivateForm = (formElement) => {
//   //пока что не используется
//   const formClass = formElement.classList[0];
//   formElement.classList.add(`${formClass}--disabled`);
//   // formElement.reset();//! ?
//   formElement.querySelectorAll('input').forEach((input) => {
//     input.disabled = true;
//   });
//   formElement.querySelectorAll('select').forEach((select) => {
//     select.disabled = true;
//   });
//   formElement.querySelectorAll('textarea').forEach((textarea) => {
//     textarea.disabled = true;
//   });
//   formElement.querySelectorAll('button').forEach((button) => {
//     button.disabled = true;
//   });
// };

const activateForm = (formElement) => {
  const formClass = formElement.classList[0];
  formElement.classList.remove(`${formClass}--disabled`);
  formElement.querySelectorAll('input').forEach((input) => {
    input.disabled = false;
  });
  formElement.querySelectorAll('select').forEach((select) => {
    select.disabled = false;
  });
  formElement.querySelectorAll('textarea').forEach((textarea) => {
    textarea.disabled = false;
  });
  formElement.querySelectorAll('button').forEach((button) => {
    button.disabled = false;
  });
};

// const deactivateApp = () => {
//   deactivateForm(form);
//   deactivateForm(filtersForm);
//   setPriceSliderActiveMode(priceSliderElement, false);
// }; //! задел на будущее, пока что не используется

const activateApp = (isSuccessLoading = true) => {
  activateForm(form);
  setPriceSliderActiveMode(priceSliderElement);
  if (isSuccessLoading) {
    activateForm(filtersForm);
  }
};

// const setActiveMode = (isActive = true, isSuccessLoading ) =>
//   isActive ? activateApp(isSuccessLoading) : deactivateApp();

export { activateApp };
