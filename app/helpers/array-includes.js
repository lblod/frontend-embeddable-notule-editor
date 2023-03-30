import { helper } from '@ember/component/helper';

export default helper(function arrayIncludes([array, value] /*, named*/) {
  return array.includes(value);
});
