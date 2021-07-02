import {COMMENT_LENGTH} from './util.js';
import {checkCommentLength} from './util.js';
import '../nouislider/nouislider.js';
import { sendNudes } from './connection.js';

const MIN_LENGTH = 2;
const HASHTAG_NUMBER = 5;
const MAX_LENGTH = 20;

// Переменные всей формы целиком
const uploadForm = document.querySelector('#upload-select-image');

// Переменные открытия окна редактирования
const uploadFile = document.querySelector('#upload-file');
const editPhoto = document.querySelector('.img-upload__overlay');
const cancel = document.querySelector('#upload-cancel');

// Пременные изменеия масштаба
const scaleValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');
const commentField = document.querySelector('.text__description');
const upScaleBtn = document.querySelector('.scale__control--bigger');
const downScaleBtn = document.querySelector('.scale__control--smaller');

const scaleDirection = {
  up: 1,
  down: -1,
};
const scaleThreshHold = {
  min: 25,
  max: 100,
  step: 25,
};

// Функция установки значения масштаба #2
const setScale = (scale) => {
  if (scale === scaleThreshHold.max) {
    imgPreview.style.transform = `scale(${scale / 100})`;
    scaleValue.value = `${scale}%`;
  } else {
    imgPreview.style.transform = `scale(0.${scale})`;
    scaleValue.value = `${scale}%`;
  }
};

// Функция установки значения масштаба #1
const changeScale = (direction, step) => {
  const scale = Number(scaleValue.value.replace(/[^\d]/g, ''));
  if (scale < scaleThreshHold.max && direction === scaleDirection.up || scale > scaleThreshHold.min && direction === scaleDirection.down) {
    setScale(scale + direction * step);
  }
};

// Переменные фильтров
const effects = document.querySelector('.effects__list');

// Переменные слайдера
const stepSlider = document.querySelector('.effect-level__slider');
const stepSliderValueElement = document.querySelector('.effect-level__value');
const regularExpFilters = 'effects__preview--';

// const getFilterClassName = () => {
//   const className = imgPreview.className.replace(regularExpFilters, '');
//   return className;
// };

// Переменные валидации
const hashtagInput = document.querySelector('.text__hashtags');
const regularExp = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;

// noUiSlider ===========================================================================================================================================================
// create slider

// Объект фильтров
const filters = {
  chrome: {
    class: 'chrome',
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    modifier: '',
  },
  sepia: {
    class: 'sepia',
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    modifier: '',
  },
  marvin: {
    class: 'marvin',
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    modifier: '%',
  },
  phobos: {
    class: 'phobos',
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    modifier: 'px',
  },
  heat: {
    class: 'heat',
    filter: 'brightness',
    min: 0,
    max: 3,
    step: 0.1,
    modifier: '',
  },
};

noUiSlider.create(stepSlider, {
  start: [1],
  step: 0.1,
  range: {
    'min': [0],
    'max': [1],
  },
  connect: 'lower',
});

// Value
stepSlider.noUiSlider.on('update', (values, handle) => {
  const sliderValue = Number(values[handle]);
  stepSliderValueElement.textContent = sliderValue;
  const className = imgPreview.className.replace(regularExpFilters, '');

  if (className && className !== '')
  {imgPreview.style.filter = `${filters[className].filter}(${sliderValue + filters[className].modifier})`;}
});

// Функция очистки формы
const cleanForm = () => {
  uploadForm.reset();
  imgPreview.style = '';
  imgPreview.className = '';
  stepSlider.classList.add('visually-hidden');
  uploadFile.value = '';
};

// Функция-обработчик на ESC keydown
const keydownEscape = (evt) => {
  if (evt.key === 'Escape') {
    if (evt.target.tagName === ('INPUT') || evt.target.tagName === ('TEXTAREA')) {
      evt.stopPropagation();
    } else {
      editPhoto.classList.add('hidden');
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', keydownEscape);
      cleanForm();
    }
  }
};

// Функция отправки формы
const sendForm = (evt) => {
  evt.preventDefault();

  const data = new FormData(evt.target);
  sendNudes(data);

  editPhoto.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', keydownEscape);
  uploadForm.removeEventListener('submit', sendForm);
  cleanForm();
};

// Открытие формы ------------------------------------------------------------------------
uploadFile.addEventListener('change', () => {
  editPhoto.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', keydownEscape);
  uploadForm.addEventListener('submit', sendForm);
});

// Закрытие формы ------------------------------------------------------------------------
cancel.addEventListener('click', () => {
  editPhoto.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', keydownEscape);
  uploadForm.removeEventListener('submit', sendForm);
  cleanForm();
});

upScaleBtn.addEventListener('click', () => changeScale(scaleDirection.up, scaleThreshHold.step));
downScaleBtn.addEventListener('click', () => changeScale(scaleDirection.down, scaleThreshHold.step));

// Фильтры ---------------------------------------------------------------------------------
effects.addEventListener('click', (evt) => {
  const element = evt.target.closest('.effects__item');
  if (element.querySelector('.effects__preview').classList.contains('effects__preview--none')) {
    imgPreview.className = '';
    imgPreview.removeAttribute('style');
    stepSlider.classList.add('visually-hidden');
  } else {
    stepSlider.classList.remove('visually-hidden');
    imgPreview.className = `${element.querySelector('.effects__preview').classList[1]}`;
    const className = imgPreview.className.replace(regularExpFilters, '');

    stepSlider.noUiSlider.updateOptions({
      range: {
        'min': filters[className].min,
        'max': filters[className].max,
      },
      step: filters[className].step,
      start: filters[className].max,
    });
  }
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

stepSlider.classList.add('visually-hidden');
