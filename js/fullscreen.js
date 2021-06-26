const bigPictureCommentTemplate = document.querySelector('.social__comment');
const bigPictureComments = document.querySelector('.social__comments');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const bigPictureimg = document.querySelector('.big-picture__img img');
const socialCaption = document.querySelector('.social__caption');

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
  removeComments();

  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  bigPictureimg.src = url;
  socialCaption.textContent = description;

  renderComments(comments);
};

export {createComment};
