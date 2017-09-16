'use strict';
if (module.hot) {
  module.hot.accept();
}
import 'babel-polyfill';
import '../styles/index.scss';
require('smoothscroll-polyfill').polyfill();

// =================

import './lib/carousel';
import './lib/nav';
import './lib/form';
import './lib/add-to-cart';

document.querySelector('html').classList.add('js');
