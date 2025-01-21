const form = document.querySelector('.ad-form');
const roomsField = document.querySelector('[name=rooms]');
const capacityField = document.querySelector('[name=capacity]');

let pristine;

const validateCapacity = (value) => {
  if (roomsField.value === '100') {
    return value === '0';
  }
  return value > 0 && value <= roomsField.value;
};

const getCapacityErrorMessage = () => {
  if (roomsField.value > 3) {
    return 'Укажите "не для гостей"';
  }
  if (roomsField.value <= 3 && capacityField.value === '0') {
    return 'Укажите количество мест';
  }
  return `Не более ${roomsField.value} ${
    roomsField.value > 1 ? 'мест' : 'места'
  }`;
};

const initPristine = () => {
  pristine = new Pristine(form, {
    classTo: 'ad-form__element',
    errorTextParent: 'ad-form__element',
    errorTextClass: 'ad-form__error',
  });

  pristine.addValidator(
    capacityField,
    validateCapacity,
    getCapacityErrorMessage
  );
};

initPristine();

const reinitPristine = () => {
  pristine.destroy();
  initPristine();
};

const validateForm = (el) => {
  if (el) {
    pristine.validate(el);
  } else {
    return pristine.validate();
  }
};

const resetValidation = () => pristine.reset();

export { validateForm, resetValidation, reinitPristine };
