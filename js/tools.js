const page = get('page');
const activeKeys = [13];

function _selector(selector, disableDot) {
  if (typeof selector != typeof '' && selector.length > 0) return undefined;
  if (!disableDot && selector[0] != '.') selector = '.' + selector;
  return selector;
}

function _update(element) {
  element.click = function (handler, up) {
    element.addEventListener('click', handler, up);
    element.addEventListener('keydown', (e) => { if (isTargetKey(e.keyCode)) handler(e); }, true);
  };

  element.on = function (type, handler) {
    element.addEventListener(type, handler)
  };

  element.add = function (name) {
    element.classList.add(name);
  };

  element.remove = function (name) {
    element.classList.remove(name);
  };

  element.toggle = function (name) {
    element.classList.toggle(name);
  };

  return element;
}

function _updateAll(elements) {
  elements.forEach(element => _update(element))

  elements.click = function (handler) {
    elements.forEach(element => element.click(handler));
  };

  elements.on = function (type, handler) {
    elements.forEach(element => element.on(type, handler));
  };

  elements.first = elements[0];
  elements.last = elements[elements.length - 1];

  return elements;
}

function get(selector, disableDot) {
  let result = document.querySelector(_selector(selector, disableDot));
  return result == null ? undefined : _update(result);
}

function getAll(selector, disableDot) {
  let result = document.querySelectorAll(_selector(selector, disableDot));
  return result.length == 0 ? undefined : _updateAll(result);
}

function style(element, pseudo) {
  let result = getComputedStyle(element);
  result.value = (name) => { return result.getPropertyValue(name, pseudo); }
  return result;
}

function isTargetKey(keyCode) {
  return activeKeys.some(key => key == keyCode);
}

function activeToggle(target, control) {
  const controls = getAll(control);

  const isActive = (e, target) => {
    return e.target.closest('.' + target).classList.contains(target + '--active');
  }

  const active = (e, target) => {
    let toActive = !isActive(e, target);
    getAll(target).forEach((element) => {
      element.remove(target + '--active');
    });

    if (toActive) e.target.closest('.' + target).classList.add(target + '--active');
  }

  controls.click((e) => {console.log(e.target);active(e, target)});
}

function isDesktop() { return document.documentElement.clientWidth > 1024; }
