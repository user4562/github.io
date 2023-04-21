// background slider

const hero = get('hero');
const backs = [
  'hero--back-1',
  'hero--back-2',
  'hero--back-3',
];

backs.index = 0;
backs.next = () => backs.index < backs.length - 1 ? (backs.index += 1) : (backs.index = 0);
backs.replace = () => hero.classList.replace(backs[backs.index], backs[backs.next()]);

let change = parseFloat(style(hero).value('--duration-change'));
let between = parseFloat(style(hero).value('--duration-between'));

let intervalID = setInterval(backs.replace, (between + change) * 1000);

// title

const heroTitle = get('hero__title');

const heroTitleNormalize = () => {
  let width = parseInt(style(heroTitle).width);

  if(width < 566 && width > 465) {
    heroTitle.style.fontSize = '60px';
    heroTitle.style.lineHeight = '70px';
    heroTitle.style.marginBottom = '10px';
  }
  else {
    heroTitle.style.fontSize = '';
    heroTitle.style.lineHeight = '';
    heroTitle.style.marginBottom = '';
  }
}

addEventListener('resize', heroTitleNormalize);
heroTitleNormalize();
