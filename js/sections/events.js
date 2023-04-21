// swiper: init

const eventsSwiper = new Swiper('.events__swiper', {
  speed: 400,

  navigation: {
    nextEl: '.events__next',
    prevEl: '.events__prev',
  },

  pagination: {
    el: '.events__pagination',
    type: 'bullets',
    clickable: true,
  },

  breakpoints: {
    0: {
      spaceBetween: 35,
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    577: {
      spaceBetween: 34,
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    769: {
      spaceBetween: 27,
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
    1025: {
      spaceBetween: 50,
      slidesPerView: 3,
      slidesPerGroup: 1,
    },
  }
});

// swiper: buttons

const eventsControlLeft = get('events__prev');
const eventsControlRight = get('events__next');

eventsControlLeft.on('keydown', (e) => {
  if(isTargetKey(e.keyCode)) eventsSwiper.slidePrev();
});

eventsControlRight.on('keydown', (e) => {
  if(isTargetKey(e.keyCode)) eventsSwiper.slideNext();
});

eventsSwiper.on('reachBeginning', () => {
  eventsControlLeft.add('button--point-hidden');
});

eventsSwiper.on('reachEnd', () => {
  eventsControlRight.add('button--point-hidden');
});

eventsSwiper.on('fromEdge', () => {
  eventsControlLeft.remove('button--point-hidden');
  eventsControlRight.remove('button--point-hidden');
});
