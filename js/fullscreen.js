const COMMENT_STEP = 5;
let currentComments = [];

const loadCommentsBtn = document.querySelector('.comments-loader');
const bigPictureCommentTemplate = document.querySelector('.social__comment');
const bigPictureComments = document.querySelector('.social__comments');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.social__comment-count');
const bigPictureImg = document.querySelector('.big-picture__img img');
const socialCaption = document.querySelector('.social__caption');
const commentCount = document.querySelector('.social__comment-count');

const removeComments = () => {
  bigPictureComments.innerHTML = '';
};

const renderComments = (commentsList) => {
  const commentFragment = document.createDocumentFragment();

  commentsList.forEach(({avatar, message, name}) => {
    const commentEl = bigPictureCommentTemplate.cloneNode(true);

    commentEl.querySelector('.social__picture').src = avatar;
    commentEl.querySelector('.social__picture').alt = name;
    commentEl.querySelector('.social__text').textContent = message;
    commentFragment.appendChild(commentEl);
  });
  bigPictureComments.appendChild(commentFragment);
};

const onLoadCommentsButtonClick = () => {
  renderComments(currentComments.slice(bigPictureComments.children.length, bigPictureComments.children.length + COMMENT_STEP));
  commentCount.innerHTML = `${bigPictureComments.children.length} из <span class="comments-count">${currentComments.length}</span> комментариев`;
  if (currentComments.length <= bigPictureComments.children.length) {
    loadCommentsBtn.classList.add('hidden');
  }
};

const openBigPicture = (photo) => {
  currentComments = photo.comments;

  removeComments();

  likesCount.textContent = photo.likes;
  commentsCount.innerHTML = `${COMMENT_STEP} из <span class="comments-count">${currentComments.length}</span> комментариев`;
  bigPictureImg.src = photo.url;
  socialCaption.textContent = photo.description;

  if (currentComments.length > COMMENT_STEP) {
    loadCommentsBtn.classList.remove('hidden');
    commentCount.classList.remove('hidden');
  }

  renderComments(currentComments.slice(0, COMMENT_STEP));

  loadCommentsBtn.addEventListener('click', onLoadCommentsButtonClick);
};

export {openBigPicture, onLoadCommentsButtonClick};
