import {createComment} from './fullscreen.js';
import {showComments} from './fullscreen.js';

const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const photoField = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const commentCount = document.querySelector('.social__comment-count');
const pictureCancelBtn = document.querySelector('#picture-cancel');
const loadCommentsBtn = document.querySelector('.comments-loader');

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

export {renderPhotos};
export {photoField};
