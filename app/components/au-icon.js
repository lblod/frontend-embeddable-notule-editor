/**
 * Based on https://github.com/appuniversum/ember-appuniversum/blob/master/addon/components/au-icon.js.
 * Uses svg inlining using `ember-svg-jar` instead of using an svg symbolset.
 *
 * The MIT License (MIT)
 * Copyright (c) 2020
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import Component from '@glimmer/component';

export default class AuIcon extends Component {
  get size() {
    if (this.args.size == 'large') return 'au-c-icon--large';
    else return '';
  }

  get alignment() {
    if (this.args.alignment == 'left') return 'au-c-icon--left';
    if (this.args.alignment == 'right') return 'au-c-icon--right';
    else return '';
  }

  get classAttribute() {
    return `au-c-icon au-c-icon--${this.args.icon} ${this.alignment} ${this.size}`;
  }

  get ariaHiddenAttribute() {
    if (this.args.ariaHidden === false || this.args.ariaHidden === 'false') {
      return 'false';
    } else {
      return 'true';
    }
  }
}
