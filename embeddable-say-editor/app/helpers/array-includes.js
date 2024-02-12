import { helper } from '@ember/component/helper';

export default helper(function arrayIncludes(arrayAndValues /*, named*/) {
  let array = arrayAndValues[0];
  let values = arrayAndValues.slice(1, arrayAndValues.length);
  return values.some((v) => array.includes(v));
});
