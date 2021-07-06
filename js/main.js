import './form.js';
import {getPhotosFetch} from './connection.js';
import {showSmallError} from './send-messages.js';
import {renderPhotos, showDiscussed, showDefault, showRandom} from './thumbnails-rendering.js';

getPhotosFetch((photos) => {
  renderPhotos(photos);
  showDiscussed(photos);
  showDefault(photos);
  showRandom(photos);
}, showSmallError);
