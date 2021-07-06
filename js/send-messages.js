const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const closeSmallPopupBtn = document.querySelector('.fail-close');
const smallPopup = document.querySelector('.fail');

const closeSmallPopup = () => {
  smallPopup.classList.add('visually-hidden');
  closeSmallPopupBtn.removeEventListener('click', closeSmallPopup);
};

const showSmallError = () => {
  smallPopup.classList.remove('visually-hidden');
  closeSmallPopupBtn.addEventListener('click', closeSmallPopup);
};

const closeMessagesEsc = (evt) => {
  if (evt.key === 'Escape') {
    document.querySelectorAll('.success, .error').forEach((node) => node.remove());
    document.removeEventListener('keydown', closeMessagesEsc);
  }
};

const showSuccessMessage = () => {
  const successMessage = document.body.appendChild(successMessageTemplate.cloneNode(true));
  successMessage.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('success__button') || evt.target.classList.contains('success')) {
      successMessage.remove();
    }
  });

  document.addEventListener('keydown', closeMessagesEsc);
};

const showErrorMessage = () => {
  const errorMessage = document.body.appendChild(errorMessageTemplate.cloneNode(true));
  errorMessage.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('error__button') || evt.target.classList.contains('error')) {
      errorMessage.remove();
    }
  });
  document.addEventListener('keydown', closeMessagesEsc);
};

export {showSuccessMessage, showErrorMessage, showSmallError};
