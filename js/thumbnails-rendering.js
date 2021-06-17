const photoTemplate = document.querySelector('#picture').content;
const photoField = document.querySelector('.pictures');

const renderPhotos = (photos) => {
  const photoFragment = document.createDocumentFragment();

  photos.forEach(({comments, likes, url}) => {
    const photoElement = photoTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;

    photoFragment.appendChild(photoElement);
  });

  photoField.appendChild(photoFragment);

};

export {renderPhotos};
