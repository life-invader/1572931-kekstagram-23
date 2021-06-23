import {COMMENT_LENGTH} from './util.js';
import {checkCommentLength} from './util.js';

const MIN_LENGTH = 2;
const HASHTAG_NUMBER = 5;
const MAX_LENGTH = 20;

// Переменные открытия окна редактирования
const uploadFile = document.querySelector('#upload-file');
const editPhoto = document.querySelector('.img-upload__overlay');
const body = document.body;
const cancel = document.querySelector('#upload-cancel');

// Пременные изменеия масштаба
const imgScale = document.querySelector('.img-upload__scale');
const scaleValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');
const commentField = document.querySelector('.text__description');

// Переменные фильтров
const effects = document.querySelector('.effects__list');

// Переменные валидации
const hashtagInput = document.querySelector('.text__hashtags');
const regularExp = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;

// Функция-обработчик на ESC keydown
const keydownEscape = (evt) => {
  if (evt.key === 'Escape') {
    if (evt.target.tagName === ('INPUT') || evt.target.tagName === ('TEXTAREA')) {
      evt.stopPropagation();
    } else {
      editPhoto.classList.add('hidden');
      body.classList.remove('modal-open');
      document.removeEventListener('keydown', keydownEscape);
      uploadFile.value = '';
    }
  }
};

// Функция изменения масштаба
const changeScale = (action, scale) => {
  if (action === 'decrease') {
    scale -= 25;
    imgPreview.style = `transform: scale(0.${scale})`;
    scaleValue.value = `${scale}%`;
  } else if (action === 'increase') {
    scale += 25;
    if (scale >= 100) {
      imgPreview.style = `transform: scale(${scale / 100})`;
      scaleValue.value = `${scale}%`;
    } else {
      imgPreview.style = `transform: scale(0.${scale})`;
      scaleValue.value = `${scale}%`;
    }
  }
};

// Открытие формы ------------------------------------------------------------------------
uploadFile.addEventListener('change', () => {
  editPhoto.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', keydownEscape);

});

cancel.addEventListener('click', () => {
  editPhoto.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', keydownEscape);
});

// Редактирование и фильтры
// Масштаб -------------------------------------------------------------------------------
imgScale.addEventListener('click', (evt) => {
  const scale = Number(scaleValue.value.replace(/[^\d]/g, ''));
  if (evt.target.classList.contains('scale__control--smaller')) {
    if (scale > 25) {
      changeScale('decrease', scale);
    }
  } else if(evt.target.classList.contains('scale__control--bigger')) {
    if (scale < 100) {
      changeScale('increase', scale);
    }
  }
});

// Фильтры ---------------------------------------------------------------------------------
effects.addEventListener('click', (evt) => {
  const element = evt.target.closest('.effects__item');
  if (element.querySelector('.effects__preview').classList.contains('effects__preview--none')) {
    imgPreview.className = '';
    imgPreview.removeAttribute('style');
  }
  imgPreview.className = `${element.querySelector('.effects__preview').classList[1]}`;
});

// Валидация ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Хэш-теги
hashtagInput.addEventListener('input', () => {
  const hashtags = hashtagInput.value.toLowerCase().trim().split(' ');

  for (let i = 0; i < hashtags.length; i++) {
    if (!(regularExp.test(hashtags[i]))) {
      hashtagInput.setCustomValidity(`
      Хэш-тег должен начинаться с "#"
      Минимальная длина ${MIN_LENGTH} символа
      Максимальная длина одного хэш-тега ${MAX_LENGTH} символов
      `);
      break;
    } else if (hashtags.length > 5) {
      hashtagInput.setCustomValidity(`Не более ${HASHTAG_NUMBER} хэш-тегов`);
      break;
    } else if (hashtags.slice(i + 1).includes(hashtags[i])) {
      hashtagInput.setCustomValidity('Хэш-теги повторяются');
      break;
    } else {
      hashtagInput.setCustomValidity('');
    }
  }
  hashtagInput.reportValidity();
});

// Комментарии
commentField.addEventListener('input', () => {
  const commentValue = commentField.value;
  if (checkCommentLength(commentValue, COMMENT_LENGTH)) {
    commentField.setCustomValidity('');
  } else {
    commentField.setCustomValidity(`Максимальная длина комментария ${COMMENT_LENGTH} символов`);
  }
  commentField.reportValidity();
});
