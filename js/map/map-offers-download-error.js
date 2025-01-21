const showDownloadErrorNotice = (message) => {
  const mapBlock = document.querySelector('.map');
  const modalTemplate = document.querySelector('#modal-load-error');
  const modalContent = modalTemplate.content.cloneNode(true);

  const modalElement = modalContent.querySelector('.page-load-error');
  const messageElement = modalContent.querySelector(
    '.page-load-error__message'
  );

  messageElement.textContent = message;

  mapBlock.appendChild(modalContent);

  setTimeout(() => {
    modalElement.classList.add('show');
  }, 10);
};


export { showDownloadErrorNotice };
