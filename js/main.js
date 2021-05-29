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
  if (comment.length > maxLength) {
    return false;
  }
  return true;
}

checkCommentLength(TEST_COMMENT, COMMENT_LENGTH);
