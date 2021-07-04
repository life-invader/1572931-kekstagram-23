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

// const closePopupsEsc = (evt) => {
//   if (evt.key === 'Escape') {
//     successMessage.remove();
//     document.removeEventListener('keydown', closePopupEsc);
//   }
// };

// ХЗ как удалить обработчкики кнопи эскейп с документа из этих двух функций
const showSuccessMessage = () => {
  const successMessage = document.body.appendChild(successMessageTemplate.cloneNode(true));
  successMessage.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('success__button') || evt.target.classList.contains('success')) {
      successMessage.remove();
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      successMessage.remove();
    }
  });
};

const showErrorMessage = () => {
  const errorMessage = document.body.appendChild(errorMessageTemplate.cloneNode(true));
  errorMessage.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('error__button') || evt.target.classList.contains('error')) {
      errorMessage.remove();
    }
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      errorMessage.remove();
    }
  });
};

const getPhotosFetch = (renderPhotos, error) => {
  fetch('https://23.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok)  {
        return response.json();
      }
      throw new Error ('Нет соединения');
    })
    .then(renderPhotos)
    .catch(error);
};

const sendFormFetch = (success, error, form) => {
  fetch('https://23.javascript.pages.academy/kekstagram', {
    method: 'POST',
    body: form,
  })
    .then((response) => {
      if (response.ok) {
        success();
      } else {
        throw new Error ('Нет соединения');
      }
    })
    .catch(() => {
      error();
    });
};

export {getPhotosFetch, sendFormFetch};
export {showSuccessMessage, showErrorMessage};
export {showSmallError};
