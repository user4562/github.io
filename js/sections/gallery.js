//------------------------------------------------------------------------------------

// select:init

const choices = new Choices('.select', {
  position: 'bottom',
  shouldSort: false,
  itemSelectText: '',
  allowHTML: false,
});

const select = get('choices');

// select: toggle

select.on('showDropdown', e => {
  getAll('choices__item--choice').on('keydown', (e) => {
    if (isTargetKey(e.keyCode)) choices.setChoiceByValue(e.target.dataset.value);
  });
});

// select: tabindex change

const selectIndexToggle = (active) => {
  getAll('choices__item--choice').forEach(item => item.tabIndex = active ? 0 : -1);
};

select.on('showDropdown', () => selectIndexToggle(true));
select.on('hideDropdown', () => selectIndexToggle(false));

// select: exit when external tab

const selectParts = ['choices__item', 'choices'];

const isSelectPart = (e) => selectParts.some(part => e.target.classList.contains(part));

document.addEventListener('focus', (e) => {
  if (!isSelectPart(e)) choices.hideDropdown();
}, true);

//------------------------------------------------------------------------------------

// checkbox: click

const checkbox = getAll('checkbox__label');

checkbox.click((e) => {
  let input = e.target.querySelector('.checkbox__input');
  input.checked = (input.checked) ? false : true;
});

//------------------------------------------------------------------------------------

// swiper: init

const gallerySwiper = new Swiper('.gallery__swiper', {
  // loop: true,
  speed: 400,
  navigation: {
    nextEl: '.gallery__next',
    prevEl: '.gallery__prev',
  },

  breakpoints: {
    0: {
      spaceBetween: 50,
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    577: {
      spaceBetween: 38,
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    769: {
      spaceBetween: 34,
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    1025: {
      spaceBetween: 50,
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
  }
});

// swiper: buttons

const galleryPrev = get('gallery__prev');
const galleryNext = get('gallery__next');

galleryPrev.on('keydown', (e) => {
  if (isTargetKey(e.keyCode)) gallerySwiper.slidePrev();
});

galleryNext.on('keydown', (e) => {
  if (isTargetKey(e.keyCode)) gallerySwiper.slideNext();
});

// swiper: counter

const galleryCounter = get('.gallery__swiper .swiper__counter');

const pagesCount = () => {
  return Math.ceil(gallerySwiper.slides.length / gallerySwiper.params.slidesPerGroup);
}

const activePage = () => {
  return Math.ceil(gallerySwiper.realIndex / gallerySwiper.slides.length * pagesCount()) + 1;
}

const printCounter = () => {
  return galleryCounter.textContent = activePage() + ' / ' + pagesCount();
}

gallerySwiper.on('activeIndexChange', printCounter);
gallerySwiper.on('breakpoint', printCounter);

printCounter();

//------------------------------------------------------------------------------------

// gallery-card: init

const galleryCards = getAll('gallery__view');
const galleryItems = getAll('gallery__item');
const galleryCardCancels = getAll('gallery-card__cancel');

galleryCards.forEach((card) => setTimeout(() => card.remove('hidden'), 1000));

// gallery-card: disclosure

galleryItems.click((e) => {
  galleryCards.forEach((card) => {
    if (card.dataset.target == e.target.dataset.path) {
      card.add('gallery__view--active');
      document.addEventListener('keydown', canselCard);

      e.target.blur();
      e.stopImmediatePropagation();
    }
  });
});

// gallery-card: closing

const canselCard = (e) => {
  if (e.keyCode == 9 || e.keyCode == 27 || e.keyCode == 13) {
    let card = get('gallery__view--active');
    card.remove('gallery__view--active');

    document.removeEventListener('keydown', canselCard);
    galleryItems.forEach((item) => {
      if (card.dataset.target == item.dataset.path) {
        setTimeout(() => item.focus(), 100);
      }
    });
  }
};

galleryCards.forEach(card => {
  card.click(() => card.remove('gallery__view--active'));

  card.querySelector('.gallery-card').addEventListener('click', (e) => {
    e.stopImmediatePropagation();
  });
});

galleryCardCancels.click((e) => {
  e.target.closest('.gallery__view').classList.remove('gallery__view--active');
});
