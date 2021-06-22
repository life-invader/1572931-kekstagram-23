import {renderPhotos} from './thumbnails-rendering.js';
import {createPhotos} from './util.js';
import './form.js';

const PHOTOS = new Array(26).fill(null).map(createPhotos);
renderPhotos(PHOTOS);
