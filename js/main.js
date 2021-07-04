import {renderPhotos} from './thumbnails-rendering.js';
import './form.js';
import {getPhotosFetch, showSmallError} from './connection.js';

getPhotosFetch(renderPhotos, showSmallError);
