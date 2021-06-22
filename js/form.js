import {COMMENT_LENGTH} from './util.js';
import {checkCommentLength} from './util.js';
import '../node_modules/nouislider/dist/nouislider.js'; // <= Почему он лежит в нод модулях

// Переменные открытия окна редактирования
const uploadFile = document.querySelector('#upload-file');
const editPhoto = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const cancel = document.querySelector('#upload-cancel');

// Пременные изменеия масштаба
const imgScale = document.querySelector('.img-upload__scale');
const scaleValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');
const commentField = document.querySelector('.text__description');

// Переменные фильтров
const effects = document.querySelector('.effects__list');

// Переменные noUi слайдера
const stepSlider = document.querySelector('.effect-level__slider');
const stepSliderValueElement = document.querySelector('.effect-level__value');

// Переменные вылидации
const MIN_LENGTH = 2;
const hashtagsNumber = 5;
const MAX_LENGTH = 20;
const hashtagInput = document.querySelector('.text__hashtags');
const re = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;

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
  let scale = scaleValue.value.replace(/[^a-zа-яё0-9\s]/gi, ' ');
  if (evt.target.classList.contains('scale__control--smaller')) {
    if (!(+scale <= 25)) {
      scale = +scale - 25;
      imgPreview.style = `transform: scale(0.${scale})`;
      scaleValue.value = `${scale}%`;
    }
  } else if(evt.target.classList.contains('scale__control--bigger')) {
    if (+scale <= 75) {
      scale = +scale + 25;
      if (+scale === 100) {
        imgPreview.style.transform = `scale(${scale / 100})`;
        scaleValue.value = `${scale}%`;
      } else {
        imgPreview.style.transform = `scale(0.${scale})`;
        scaleValue.value = `${scale}%`;
      }
    }
  }
});

// Фильтры ---------------------------------------------------------------------------------
effects.addEventListener('click', (evt) => {
  const element = evt.target.closest('.effects__item');
  if (element.querySelector('.effects__preview').classList.contains('effects__preview--none')) {
    imgPreview.className = '';
  }
  imgPreview.className = `${element.querySelector('.effects__preview').classList[1]}`;
});

// noUiSlider -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
noUiSlider.create(stepSlider, {
  start: [100],
  step: 1,
  range: {
    'min': [1],
    'max': [100],
  },
});

stepSlider.noUiSlider.on('update', function (values, handle) {
  stepSliderValueElement.innerHTML = values[handle];
  if (imgPreview.classList.contains('effects__preview--chrome')) {
    imgPreview.style = `filter: grayscale(${stepSliderValueElement.textContent})`;
  }
  console.log(noUiSlider);
});

// Валидация ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Хэш-теги
hashtagInput.addEventListener('input', () => {
  const hashtags = hashtagInput.value.toLowerCase().split(' ');

  for (let i = 0; i < hashtags.length; i++) {
    if (!(re.test(hashtags[i]))) {
      hashtagInput.setCustomValidity(`
      Хэш-тег должен начинаться с "#"
      Минимальная длина ${MIN_LENGTH} символа
      Максимальная длина одного хэш-тега ${MAX_LENGTH} символов
      `);
      break;
    } else if (hashtags.length > 5) {
      hashtagInput.setCustomValidity(`Не более ${hashtagsNumber} хэш-тегов`);
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
  if ( !(checkCommentLength(commentValue, COMMENT_LENGTH)) ) {
    commentField.setCustomValidity(`Максимальная длина комментария ${COMMENT_LENGTH} символов`);
  } else {
    commentField.setCustomValidity('');
  }
  commentField.reportValidity();
});
