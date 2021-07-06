const COMMENT_LENGTH = 140;
const TEST_COMMENT = 'Функция для проверки максимальной длины строки. Будет использоваться для проверки длины введённого комментария, но должна быть универсальна.';

const checkCommentLength = (comment, maxLength) => comment.length <= maxLength;
checkCommentLength(TEST_COMMENT, COMMENT_LENGTH);

function generateNumber (minNumber, maxNumber) {
  if (maxNumber <= minNumber || maxNumber < 0 || minNumber < 0) {
    throw new Error('Неверно указан диапазон значений');
  }
  minNumber = Math.round(minNumber);
  maxNumber = Math.round(maxNumber);
  const newNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  return newNumber;
}

function newGenerateFunc () {
  let unique = [];

  return function greeting (minNumber, maxNumber) {
    let newNumber = generateNumber(minNumber, maxNumber);
    if (unique.length >= (maxNumber - minNumber + 1)) {
      unique = [];
    }
    while (unique.includes(newNumber)) {
      newNumber = generateNumber(minNumber, maxNumber);
    }
    unique.push(newNumber);
    return newNumber;
  };
}

const generateRandomNumber = newGenerateFunc();

export {COMMENT_LENGTH};
export {checkCommentLength, generateRandomNumber};
