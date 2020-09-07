export default {
    bind: function(el) {
        el.handler = function() {
            el.value = el.value.replace(/\D+/, '')
        };
        el.addEventListener('input', el.handler);
    },
    unbind: function(el) {
        el.removeEventListener('input', el.handler)
    }
}