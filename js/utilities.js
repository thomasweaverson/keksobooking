const isEscapeKey = (evt) => evt.key === 'Escape';

const hide = (element) => {
  element.classList.add('hidden');
};

const show = (element) => {
  element.classList.remove('hidden');
};

const blockBodyScroll = () => {
  document.body.classList.add('modal-open');
};

const unblockBodyScroll = () => {
  document.body.classList.remove('modal-open');
};

const isAnyModalShown = () => {
  const modals = document.querySelectorAll('.modal');
  return Array.from(modals).some((el) => !el.classList.contains('hidden'));
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { isEscapeKey, hide, show, blockBodyScroll, unblockBodyScroll, isAnyModalShown, debounce };

