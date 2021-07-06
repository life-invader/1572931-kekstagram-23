import {createComment, showComments} from './fullscreen.js';
import {generateRandomNumber} from './util.js';
import { debounce } from './utils/debounce.js';

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

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  commentCount.classList.add('hidden');
  document.body.classList.remove('modal-open');

  loadCommentsBtn.removeEventListener('click', showComments);
  pictureCancelBtn.removeEventListener('click', closeBigPicture);
};

const closeBigEsc = (evt) => {
  if(evt.key === 'Escape' && evt.target.tagName !== 'INPUT') {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    commentCount.classList.add('hidden');

    loadCommentsBtn.removeEventListener('click', showComments);
    document.removeEventListener('keydown', closeBigEsc);
  }
};

const renderPhotos = (photos) => {
  const photoFragment = document.createDocumentFragment();

  photos.forEach(({comments, likes, url, description}) => {
    const photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;

    photoElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      createComment(comments, likes, url, description);
    });

    photoFragment.appendChild(photoElement);
  });

  photoField.appendChild(photoFragment);

  photoField.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('picture__img')) {
      bigPicture.classList.remove('hidden');
      document.body.classList.add('modal-open');

      document.addEventListener('keydown', closeBigEsc);
      pictureCancelBtn.addEventListener('click', closeBigPicture);
    }
  });
};

const deletePhotos = () => {
  const toDelete = photoField.querySelectorAll('.picture');
  for (const value of toDelete) {
    value.remove();
  }
};

const debounceRender = debounce(renderPhotos, 500);
const debounceDelete = debounce(deletePhotos, 500);

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

    const randomArray = [];
    for (let i = 0; i < 10; i++) {
      randomArray.push(array[generateRandomNumber(0, array.length)]);
    }

    debounceDelete();
    debounceRender(randomArray);
  });
};

export {renderPhotos};
export {photoField};
export {showDiscussed, showDefault, showRandom};
