//------------------------------------------------------------------------------------

// navigation: init

const navigation = get('header-up__nav');
const navigationControl = get('header-up__burger');
const navigationCancel = get('.header-up .nav__cancel');
const navigationLinks = getAll('.header-up .nav__link');

// navigation: disclosure

navigationControl.click(() => {
  navigation.add('header-up__nav--active');
  page.add('stop-scroll');
  setTimeout(() => navigationCancel.focus(), 100);
});

// navigation: closing

const navigationClosing = () => {
  navigation.remove('header-up__nav--active');
  page.remove('stop-scroll');
}

navigationCancel.click(() => {
  navigationClosing();
  setTimeout(() => navigationControl.focus(), 100);
});

navigationLinks.click(() => navigationClosing());

// navigation: tabindex change

const isNavigationClose = () => navigationCancel.getBoundingClientRect().top < 0;

const changeNavTabIndex = (thisInit) => {
  let indexes = [(thisInit ? -1 : 0), (thisInit ? 0 : -1)];
  let newTabIndex = isNavigationClose() ? indexes[0] : indexes[1];

  navigationCancel.tabIndex = newTabIndex;
  navigationLinks.forEach(link => link.tabIndex = newTabIndex);
}

addEventListener('resize', () => changeNavTabIndex(true));
changeNavTabIndex(true);

navigationControl.click(() => changeNavTabIndex());
navigationCancel.click(() => changeNavTabIndex());
navigationLinks.click(() => changeNavTabIndex());

// navigation: exit when external tab

const navChilds = ['nav__link', 'nav__cancel'];

const isNavChild = (e) => navChilds.some(child => e.target.classList.contains(child));

document.addEventListener('focus', (e) => {
  if (!isNavChild(e) && !isDesktop()) {
    navigation.remove('header-up__nav--active');
    navigationLinks.forEach(link => link.tabIndex = -1);
    navigationCancel.tabIndex = -1;
  }
}, true);

//------------------------------------------------------------------------------------

// search-form: init

const searchControl = get('header-up__search');

const searchForm = get('search-form');
const searchLabel = get('search-form__label');
const searchInput = get('search-form__input');
const searchCancel = get('search-form__cancel');
const searchSubmit = get('search-form__submit');

// search-form: disclosure

searchControl.click(() => {
  searchForm.add('search-form--active');
  searchControl.add('search--hidden');
  setTimeout(() => searchInput.focus(), 300);
});

// search-form: closing

const activeDuration = parseFloat(style(searchForm).value('--active-time')) * 1000;

searchCancel.click(() => {
  if (isDesktop()) {
    searchCancel.remove('search-form__cancel--visible');
    searchInput.value = '';
    setTimeout(() => searchInput.focus(), 100);
  }
  else {
    searchForm.remove('search-form--active');
    console.log(activeDuration)
    setTimeout(() => searchControl.remove('search--hidden'), activeDuration);
    // setTimeout(() => searchControl.focus(), activeDuration);
  }
});

// search-form: tabindex change

const isSearchClose = () => {
  return searchCancel.getBoundingClientRect().right > document.documentElement.clientWidth;
}

const changeSearchTabIndex = (thisInit) => {
  if (!isDesktop()) {
    let indexes = [(thisInit ? 0 : -1), (thisInit ? -1 : 0)];
    let newTabIndex = isSearchClose() ? indexes[1] : indexes[0];

    searchControl.tabIndex = isSearchClose() ? indexes[0] : indexes[1];;

    searchCancel.tabIndex = newTabIndex;
    searchInput.tabIndex = newTabIndex;
    searchSubmit.tabIndex = newTabIndex;
  }
  else {
    searchControl.tabIndex = -1
    searchCancel.tabIndex = 0;
    searchInput.tabIndex = 0;
    searchSubmit.tabIndex = 0;
  }
}

addEventListener('resize', () => changeSearchTabIndex(true));
changeSearchTabIndex(true);

searchControl.click(() => changeSearchTabIndex());
searchCancel.click(() => changeSearchTabIndex());

// search-form: input focus

searchInput.on('keyup', () => {
  if (searchInput.value.length > 0) searchCancel.add('search-form__cancel--visible');
  else searchCancel.remove('search-form__cancel--visible');
});

searchInput.on('focus', () => searchLabel.add('search-form__label--focus'));
searchInput.on('focusout', () => searchLabel.remove('search-form__label--focus'));

// search-form: exit when external tab

const searchChilds = ['search', 'search-form__input', 'search-form__cancel', 'search-form__submit'];

const isSearchChild = (e) => searchChilds.some(child => e.target.classList.contains(child));

document.addEventListener('focus', (e) => {
  if (!isSearchChild(e)) {
    searchForm.remove('search-form--active');
    setTimeout(() => searchControl.remove('search--hidden'), activeDuration);

    if (!isDesktop()) {
      searchControl.tabIndex = 0
      searchCancel.tabIndex = -1;
      searchInput.tabIndex = -1;
      searchSubmit.tabIndex = -1;
    }
  }
}, true);

// search-form: a11y

const searchCancelAria = () => {
  if(isDesktop()) searchCancel.setAttribute('aria-label', 'Отчистить ввод');
  else searchCancel.setAttribute('aria-label', 'Закрыть поиск по сайту');
}

addEventListener('resize', searchCancelAria);
searchCancelAria();

//------------------------------------------------------------------------------------

// art-style: init

const artLinks = getAll('art-style__link');
const artLists = getAll('art-style__list');
const artButtons = getAll('art-style__button');

// art-style: disclosure + closing

activeToggle('art-style', 'art-style__button');

// art-style: tabindex change

artButtons.click((e) => {
  console.log('index')
  let art = e.target.closest('.art-style');
  if (art.classList.contains('art-style--active')) {
    art.querySelectorAll('.art-style__link').forEach(item => item.tabIndex = 0);
  }
  else {
    art.querySelectorAll('.art-style__link').forEach(item => item.tabIndex = -1);
  }

  e.target.blur();
  e.stopImmediatePropagation();
});

artLinks.forEach(link => link.tabIndex = -1);
artLinks.click((e) => e.target.closest('.art-style').remove('art-style--active'));

// art-style: hidden

const hiddenArtStyle = () => {
  if (isDesktop()) artButtons.forEach(button => button.tabIndex = 0);
  else artButtons.forEach(button => button.tabIndex = -1);
}

addEventListener('resize', () => hiddenArtStyle());
hiddenArtStyle();

// art-style: simplebar

artLists.forEach((artList) => {
  new SimpleBar(artList, { autoHide: false, scrollbarMaxSize: 28 });
});

getAll('simplebar-content-wrapper').forEach(wrapper => wrapper.tabIndex = -1);

//------------------------------------------------------------------------------------

