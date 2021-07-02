const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const closeLittlePopupBtn = document.querySelector('.fail-close');
const littlePopup = document.querySelector('.fail');

const closeLittlePopup = () => {
  littlePopup.classList.add('visually-hidden');
  closeLittlePopupBtn.removeEventListener('click', closeLittlePopup);
};

const onError = () => {
  littlePopup.classList.remove('visually-hidden');
  closeLittlePopupBtn.addEventListener('click', closeLittlePopup);
};

// ХЗ как удалить обработчкики кнопи эскейп с документа из этих двуъ функций
const successEvent = (clone) => {
  clone.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('success__button') || evt.target.classList.contains('success')) {
      clone.remove();
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      clone.remove();
    }
  });
};

const errorEvent = (clone) => {
  clone.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('error__button') || evt.target.classList.contains('error')) {
      clone.remove();
    }
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      clone.remove();
    }
  });
};

const getPhotosFetch = (renderPhotos) => {
  fetch('https://23.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok)  {
        return response.json();
      }
      throw new Error ('Нет соединения');
    })
    .then(renderPhotos)
    .catch(onError);
};

const sendNudes = (form) => {
  fetch('https://23.javascript.pages.academy/kekstagram', {
    method: 'POST',
    body: form,
  })
    .then((response) => {
      if (response.ok) {
        const successMessage = document.body.appendChild(successMessageTemplate.cloneNode(true));

        successEvent(successMessage);
      } else {
        throw new Error ('Нет соединения');
      }
    })
    .catch(() => {
      const errorMessage = document.body.appendChild(errorMessageTemplate.cloneNode(true));
      errorEvent(errorMessage);
    });
};

export {getPhotosFetch};
export {sendNudes};
