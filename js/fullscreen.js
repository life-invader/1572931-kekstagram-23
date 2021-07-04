const COMMENT_STEP = 5;

const bigPictureCommentTemplate = document.querySelector('.social__comment');
const bigPictureComments = document.querySelector('.social__comments');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.social__comment-count');
const bigPictureimg = document.querySelector('.big-picture__img img');
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

const createComment = (comments, likes, url, description) => {
  const loadCommentsBtn = document.querySelector('.comments-loader');

  removeComments();

  likesCount.textContent = likes;
  commentsCount.innerHTML = `${COMMENT_STEP} из <span class="comments-count">${comments.length}</span> комментариев`;
  bigPictureimg.src = url;
  socialCaption.textContent = description;

  if (comments.length > COMMENT_STEP) {
    loadCommentsBtn.classList.remove('hidden');
    commentCount.classList.remove('hidden');
  }

  renderComments(comments.slice(0, COMMENT_STEP));

  loadCommentsBtn.addEventListener('click', () => {
    renderComments(comments.slice(bigPictureComments.children.length, bigPictureComments.children.length + COMMENT_STEP));
    commentCount.innerHTML = `${bigPictureComments.children.length} из <span class="comments-count">${comments.length}</span> комментариев`;
    if (comments.length === bigPictureComments.children.length) {
      loadCommentsBtn.classList.add('hidden');
    }
  });
};

export {createComment};
