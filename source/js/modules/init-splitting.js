import * as splitter from '../vendor/splitting.js';

export const initSplitter = () => {
  splitter.default({by: 'lines'});
};
