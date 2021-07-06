import {renderPhotos} from './thumbnails-rendering.js';
import './form.js';
import {getPhotosFetch, showSmallError} from './connection.js';
import {showDiscussed, showDefault, showRandom} from './thumbnails-rendering.js';

getPhotosFetch((photos) => {
  renderPhotos(photos);
  showDiscussed(photos);
  showDefault(photos);
  showRandom(photos);
}, showSmallError);
