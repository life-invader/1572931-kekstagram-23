const GET_PHOTOS_LINK = 'https://23.javascript.pages.academy/kekstagram/data';
const SEND_FORM_LINK = 'https://23.javascript.pages.academy/kekstagram';

const getPhotosFetch = (renderPhotos, onError) => {
  fetch(GET_PHOTOS_LINK)
    .then((response) => {
      if (response.ok)  {
        return response.json();
      }
      throw new Error ('Не удалось загрузить');
    })
    .then(renderPhotos)
    .catch(onError);
};

const sendFormFetch = (onSuccess, onError, form) => {
  fetch(SEND_FORM_LINK, {
    method: 'POST',
    body: form,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        throw new Error ('Нет соединения');
      }
    })
    .catch(onError);
};

export {getPhotosFetch, sendFormFetch};
