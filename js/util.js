const COMMENT_LENGTH = 140;

const checkCommentLength = (comment, maxLength) => comment.length <= maxLength;

const generateNumber = (minNumber, maxNumber) => {
  if (maxNumber <= minNumber || maxNumber < 0 || minNumber < 0) {
    throw new Error('Неверно указан диапазон значений');
  }
  minNumber = Math.round(minNumber);
  maxNumber = Math.round(maxNumber);
  const newNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  return newNumber;
};

const generateUniqueNumber = () => {
  let unique = [];

  return (minNumber, maxNumber) => {
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
};

const generateRandomNumber = generateUniqueNumber();

export {COMMENT_LENGTH, checkCommentLength, generateRandomNumber};
