import {generateTestArray} from './util.js';

const TEST_ARRAY = new Array(25).fill(null).map(generateTestArray);
TEST_ARRAY.slice();   // Чтобы обойти линтер, иначе ошибка assigned but never used.
