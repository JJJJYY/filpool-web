const getParentById = (el, id) => {
  let parent = el
  while (parent) {
    if (parent == null || parent.id == null) {
      parent = el
      break
    }
    if (parent.id === id) {
      break
    }
    parent = parent.parentNode
  }
  return parent
}

export default {
  // Check item in the display area
  inViewScroll(el, options) {
    const rect = el.getBoundingClientRect()
    return !(rect.bottom < 0 || rect.right < 0 || rect.left > window.innerWidth || rect.top > window.innerHeight - (options.showHeight || el.clientHeight))
  },

  bind(el, binding) {
    // Default schema options
    let defalutOptions = {
      active: 'active',
      delay: 0,
      parentId: null,
      showHeight: '',  //多少可见度执行
      callback: function () {},
      container: document
    };

    // Assign default options and element options
    let options = Object.assign({}, defalutOptions, binding.value);

    // Add no-active class to element
    el.classList.add('no-active')

    el.$onScroll = () => {
      const targetElement = options.parentId
        ? getParentById(el, options.parentId)
        : el

      if (binding.def.inViewScroll(targetElement, options)) {
        // Delay add class
        setTimeout(() => {
          const classList = options.active.split(' ')
          classList.forEach(val => {
            el.classList.add(val)
          })
          el.classList.remove('no-active');
          options.callback(el);
        }, options.delay)

        // Unbinding event
        binding.def.unbind(el, binding)
      }
    };
    (options.container || defalutOptions.container).addEventListener('scroll', el.$onScroll)
  },

  inserted(el, binding) {
    el.$onScroll()
  },

  unbind(el, binding) {
    let container = binding.value.container || document;
    container.removeEventListener('scroll', el.$onScroll)
    delete el.$onScroll
  }
}
