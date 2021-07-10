import {openBigPicture, onLoadCommentsButtonClick} from './fullscreen.js';
import {generateRandomNumber} from './util.js';
import {debounce} from './debounce.js';

const RANDOM_PHOTOS_COUNT = 10;

const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const photoField = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const commentCount = document.querySelector('.social__comment-count');
const pictureCancelBtn = document.querySelector('#picture-cancel');
const loadCommentsBtn = document.querySelector('.comments-loader');
const discussedImgBtn = document.querySelector('#filter-discussed');
const randomImgBtn = document.querySelector('#filter-random');
const defaultImgBtn = document.querySelector('#filter-default');
const sortForm = document.querySelector('.img-filters__form');
const imgFilters = document.querySelector('.img-filters');

function onFullscreenImgClose() {
  bigPicture.classList.add('hidden');
  commentCount.classList.add('hidden');
  document.body.classList.remove('modal-open');

  loadCommentsBtn.removeEventListener('click', onLoadCommentsButtonClick);
  pictureCancelBtn.removeEventListener('click', onFullscreenImgClose);
  document.removeEventListener('keydown', onFullscreenImgEscKeydown);
}

function onFullscreenImgEscKeydown(evt) {
  if(evt.key === 'Escape' && evt.target.tagName !== 'INPUT') {
    onFullscreenImgClose();
  }
}

const showFullscreenImg = () => {
  photoField.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('picture__img')) {
      bigPicture.classList.remove('hidden');
      document.body.classList.add('modal-open');

      document.addEventListener('keydown', onFullscreenImgEscKeydown);
      pictureCancelBtn.addEventListener('click', onFullscreenImgClose);
    }
  });
};

const createPhoto = (photo) => {
  const photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

  photoElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(photo);
  });
  return photoElement;
};

const showFilterButtons = () => {
  imgFilters.classList.remove('img-filters--inactive');
};

const renderPhotos = (photos) => {
  const photoFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const photoElement = createPhoto(photo);
    photoFragment.appendChild(photoElement);
  });
  photoField.appendChild(photoFragment);
};

const deletePhotos = () => {
  const photos = photoField.querySelectorAll('.picture');
  photos.forEach((photo) => {
    photo.remove();
  });
};

const debounceRender = debounce(renderPhotos);
const debounceDelete = debounce(deletePhotos);

const showDiscussed = (array) => {
  discussedImgBtn.addEventListener('click', (evt) => {
    for (const button of sortForm.children) {
      button.classList.remove('img-filters__button--active');
    }
    evt.target.classList.add('img-filters__button--active');

    const discussedArray = array.slice().sort((a, b) => b.comments.length - a.comments.length);
    debounceDelete();
    debounceRender(discussedArray);
  });
};

const showDefault = (array) => {
  defaultImgBtn.addEventListener('click', (evt) => {
    for (const button of sortForm.children) {
      button.classList.remove('img-filters__button--active');
    }
    evt.target.classList.add('img-filters__button--active');

    debounceDelete();
    debounceRender(array);
  });
};

const showRandom = (array) => {
  randomImgBtn.addEventListener('click', (evt) => {
    for (const button of sortForm.children) {
      button.classList.remove('img-filters__button--active');
    }
    evt.target.classList.add('img-filters__button--active');

    const randomArray = Array.from({length: RANDOM_PHOTOS_COUNT}, () =>  array[generateRandomNumber(0, array.length - 1)]);

    debounceDelete();
    debounceRender(randomArray);
  });
};

showFullscreenImg();

export {renderPhotos, photoField, showDiscussed, showDefault, showRandom, showFilterButtons};
