import {renderPhotos} from './thumbnails-rendering.js';
import './form.js';
import {getPhotosFetch} from './connection.js';

getPhotosFetch(renderPhotos);
