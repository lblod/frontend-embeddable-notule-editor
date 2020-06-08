export function initialize(/* application */) {
  // application.inject('route', 'foo', 'service:foo');
}

export default {
  initialize() {
    flatpickr.localize(flatpickr.l10ns.nl);
  }
};
