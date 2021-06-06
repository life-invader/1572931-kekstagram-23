const COMMENT_LENGTH = 140;
const TEST_COMMENT = 'Функция для проверки максимальной длины строки. Будет использоваться для проверки длины введённого комментария, но должна быть универсальна.';

function generateRandomNumber (minNumber, maxNumber) {
  minNumber = Math.round(minNumber);
  maxNumber = Math.round(maxNumber);
  if (maxNumber <= minNumber || maxNumber < 0 || minNumber < 0) {
    return 'Неверно указан диапазон значений';
  }
  return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
}

generateRandomNumber(2, 5);

function checkCommentLength (comment, maxLength) {
  return comment.length < maxLength;
}

checkCommentLength(TEST_COMMENT, COMMENT_LENGTH);

/* 4.9. Больше деталей */

const TEST_NAMES = ['Саша', 'Маша', 'Даша', 'Андрей', 'Алексей'];
const TEST_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

function generateTestArray () {

  function generateTestComment () {
    return {
      id: generateRandomNumber(1, 1000000),
      avatar: `img/avatar-${generateRandomNumber(1, 6)}.svg`,
      message: TEST_COMMENTS[generateRandomNumber(0, TEST_COMMENTS.length - 1)],
      name: TEST_NAMES[generateRandomNumber(0, TEST_NAMES.length - 1)],
    };
  }

  return {
    id: generateRandomNumber(1, 25),
    url: `photos/${generateRandomNumber(1, 25)}.jpg`,
    description: 'Тестовое описание',
    likes: generateRandomNumber(15, 200),
    comments: new Array(generateRandomNumber(1, 10)).fill(null).map(generateTestComment),
  };
}

const TEST_ARRAY = new Array(25).fill(null).map(generateTestArray);
console.log(TEST_ARRAY);
