//------------------------------------------------------------------------------------

// form: inputMask init

const inputTel = get("input[type='tel']", true);
const inputMask = new Inputmask('+7 (999)-999-99-99');

inputMask.mask(inputTel);

// form: validator init

const validator = new JustValidate('.contacts__form', {
  errorFieldCssClass: 'input--contacts-invalid',
  errorLabelCssClass: 'warning-label',
  lockForm: false,
});

validator.addField('#name', [
  {
    rule: 'required',
    errorMessage: 'Вы не ввели имя',
  },
  {
    rule: 'minLength',
    value: 3,
    errorMessage: 'Имя слишком короткое'
  },
  {
    rule: 'maxLength',
    value: 50,
    errorMessage: 'Имя слишком длинное'
  },
]).addField('#phone', [
  {
    rule: 'required',
    errorMessage: 'Вы не ввели телефон',
  },
  {
    validator: (name, value) => {
      const phone = inputTel.inputmask.unmaskedvalue();
      return Number(phone) && phone.length === 10;
    },
    errorMessage: 'Недопустимый формат',
  },
]);

// form: tab navigation

const inputs = getAll('input--contacts');
const submit = get('contacts__submit');

inputs.on('keydown', (e) => e.target.add('input--contacts-unback'));
inputs.on('focusout', (e) => e.target.remove('input--contacts-unback'));

inputs.on('keydown', (e) => {
    if(isTargetKey(e.keyCode)) {
      let nextIndex = Array.from(inputs).indexOf(e.target) + 1;

      if(nextIndex > inputs.length - 1) submit.focus();
      else inputs[nextIndex].focus();
    }
});

//------------------------------------------------------------------------------------

// ymap: init

ymaps.ready(() => {
  let map = new ymaps.Map('contacts__map', {
    center: [55.7584, 37.6010],
    zoom: 14,
  });

  let placemark = new ymaps.Placemark([55.758468, 37.601088], {}, {
    iconLayout: 'default#image',
    iconImageHref: '../../img/icons/map-placemark.svg',
    iconImageSize: [20, 20],
  });

  map.geoObjects.add(placemark);
});

//------------------------------------------------------------------------------------
