const COMMENT_LENGTH = 140;
const TEST_COMMENT = 'Функция для проверки максимальной длины строки. Будет использоваться для проверки длины введённого комментария, но должна быть универсальна.';

const checkCommentLength = (comment, maxLength) => comment.length <= maxLength;
checkCommentLength(TEST_COMMENT, COMMENT_LENGTH);

export {COMMENT_LENGTH};
export {checkCommentLength};
