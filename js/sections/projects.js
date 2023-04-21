//------------------------------------------------------------------------------------

// tooltip: toggle

activeToggle('tooltip', 'tooltip');

// tooltip: horizontal normalize

function tooltipNormalize (marker) {
  const sideOffset = 5;

  let overall = document.documentElement.clientWidth;
  let tooltip = marker.closest('.tooltip');
  let text = tooltip.querySelector('.tooltip__text');

  text.style.marginLeft = '';
  text.style.marginRight = '';

  let textRect = text.getBoundingClientRect();
  let textLeft = textRect.left;
  let textRight = overall - textRect.right;

  if(text.getBoundingClientRect().width == 0) {
    let textWidth = parseInt(style(text).width);
    textLeft = text.getBoundingClientRect().left - (textWidth / 2);
    textRight = overall - (textLeft + textWidth);
  }

  if(textLeft < 0) {
    text.style.marginLeft = Math.abs(textLeft * 2) + sideOffset  + 'px';
    text.style.marginRight = '';
  }

  if(textRight < 0) {
    text.style.marginRight = Math.abs(textRight * 2) + sideOffset + 'px';
    text.style.marginLeft = '';
  }
}

getAll('tooltip__marker').click((e) => { tooltipNormalize(e.target)});

addEventListener('resize', () => {
  let tooltip = get('tooltip--active');
  if(tooltip == undefined) return;
  tooltipNormalize(tooltip.querySelector('.tooltip__marker'));
});

//------------------------------------------------------------------------------------

// swiper: init

const swiperPartners = new Swiper('.partners__swiper', {
  speed: 400,
  navigation: {
    nextEl: '.partners__next',
    prevEl: '.partners__prev',
  },

  breakpoints: {
    0: {
      spaceBetween: 33,
      slidesPerView: 1,
    },
    577: {
      spaceBetween: 33,
      slidesPerView: 2,
    },
    769: {
      spaceBetween: 50,
      slidesPerView: 2,
    },
    1025: {
      spaceBetween: 50,
      slidesPerView: 3,
    },
  }
});

// swiper: buttons

get('partners__prev').on('keydown', (e) => {
  if(isTargetKey(e.keyCode)) swiperPartners.slidePrev();
});

get('partners__next').on('keydown', (e) => {
  if(isTargetKey(e.keyCode)) swiperPartners.slideNext();
});

//------------------------------------------------------------------------------------
