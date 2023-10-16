export function initialize(/* application */) {
  console.log('localising!!!');
  // application.inject('route', 'foo', 'service:foo');
}

export default {
  initialize() {
    console.log('localising!!! default');
  },
};
