import {createPhotos} from './util.js';

const photoFragment = document.createDocumentFragment();
const photoTemplate = document.querySelector('#picture').content;
const photoField = document.querySelector('.pictures');

const TEST_ARRAY = new Array(26).fill(null).map(createPhotos);

TEST_ARRAY.forEach(({comments, likes, url}) => {
  const photoElement = photoTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoElement.querySelector('.picture__comments').textContent = comments.length;

  photoFragment.appendChild(photoElement);
  photoField.appendChild(photoFragment);
});
