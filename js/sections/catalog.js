//------------------------------------------------------------------------------------

// accordion: init

const accordion = new Accordion('.catalog__accordions', {
  elementClass: 'accordion',
  activeClass: 'accordion--active',
  triggerClass: 'accordion__control',
  panelClass: 'accordion__content',
});

// accordion: tabindex change

const accorsions = getAll('accordion');

accorsions.click((e) => {
  accorsions.forEach(acc => {
    acc.querySelectorAll('[tabindex]').forEach(item => item.tabIndex = -1);
  });

  let accodion = e.target.closest('.accordion');
  let items = accodion.querySelectorAll('[tabindex]');

  items.forEach(item => {
    if (accodion.classList.contains('accordion--active')) item.tabIndex = 0;
    else item.tabIndex = -1;
  })
});

//------------------------------------------------------------------------------------

// names: click -> open person card

const names = getAll('names__name');
const persons = getAll('person');

names.click((e) => {
  let path = e.target.dataset.path;
  let exist = false;

  if (path == undefined) return;

  persons.forEach((person) => {
    if (person.dataset.target == path) {
      person.add('person--current');
      exist = true;
    }
    else {
      person.remove('person--current');
    }

    if (!exist) get('person--null').add('person--current');
  });
});

// names: grid init

const namesList = get('names');
const namesCount = names.length;

const minRowsCount = 9;
const maxColumnsCount = 3;
const maxColumnsGap = 43;

let minCellWidth = 0;

names.forEach(item => {
  let itemWidth = parseInt(style(item).width);
  if (minCellWidth < itemWidth) minCellWidth = itemWidth;
});

// names: grid print

const printGrid = () => {
  namesList.style.maxWidth = '';

  let columns = Math.floor(parseInt(style(namesList).width) / minCellWidth);
  let rows = Math.ceil(namesCount / columns);

  if (rows < minRowsCount) rows = minRowsCount;
  if (columns > maxColumnsCount) columns = maxColumnsCount;

  namesList.style.setProperty('--columns', columns);
  namesList.style.setProperty('--rows', rows);

  namesList.style.maxWidth = ((minCellWidth) * columns) + (maxColumnsGap * (columns - 1)) + 'px';
}

addEventListener('resize', printGrid);
printGrid();

//------------------------------------------------------------------------------------
