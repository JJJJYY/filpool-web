export default {
  bind: function(el) {
    el.handler = function() {
      setTimeout(() => {
        el.scrollIntoView(false);
      }, 500);
    };
    el.addEventListener('click', el.handler);
  },
  unbind: function(el) {
    el.removeEventListener('focus', el.handler)
  }
}