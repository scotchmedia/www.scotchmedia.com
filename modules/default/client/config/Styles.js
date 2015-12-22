import color from 'color';

const PORTRAIT = '(orientation:portrait)';
const LANDSCAPE = '(orientation:landscape)';
const SMALL = 'only screen and (max-width: 420px)';
const MEDIUM = 'only screen and (min-width: 421px) and (max-width: 999px)';
const LARGE = 'only screen and (min-width: 1000px)';

const accent0 = '#ffffff';
const accent1 = '#ff4081';
const accent2 = '#ff80ab';
const accent3 = '#f50057';
const primary0 = '#ffffff';
const primary1 = '#3f51b5';
const primary2 = '#c5cae9';
const primary3 = '#1a237e';
const grayLighter = color('#282a2b').lightness(0.7).hexString();
const whiteDark = color('#282a2b').lightness(0.5).hexString();
const grayLight = color('#282a2b').lightness(0.4).hexString();
const whiteDarker = color('#282a2b').lightness(0.2).hexString();
const whiteDarkest = color('#282a2b').lightness(0.1).hexString();
const glt70 = color('#282a2b').lightness(70).rgbString();
const glt50 = color('#282a2b').lightness(50).hexString();
const glt40 = color('#282a2b').lightness(40).hexString();
const glt20 = color('#282a2b').lightness(20).hexString();
const glt10 = color('#282a2b').lightness(10).hexString();
const gray = '#282a2b';
const offWhite = '#F1F1F2';

export default {
  landscape: {
    width: '100%',
    maxWidth: 1280,
    bar: {
      width: 1280,
    },
    content: {
      width: 1280,
    },
  },
  fontFamily: {
    museoSans: `"MuseoSans", "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif`,
    museoSlab: `"MuseoSlab", "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif`,
  },
  header: {
    backgroundColor: '#18c2e1',
    padding: 20,
  },
  navLink: {
    color: primary1,
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 8,
    paddingLeft: 8,
    // height: 40,
    // fontSize: 14,
    // fontWeight: 500,
    // textTransform: 'uppercase',
    // display: 'flex',
    // alignItems: 'center',
    // height: 60,
    ':active': {
      color: '#',
    },
    ':hover': {
      color: '#ffffff',
    },
  },
  button: {
    // color: '#161412',
    color: '#fff',
    background: '#FF7F00',
    ':hover': {
      color: '#161412',
      background: '#e5e5e5',
    },
    ':disabled': {
      color: '#bebebe',
      background: '#e5e5e5',
    },
  },
  buttonSmall: {
    color: '#161412',
    background: '#A3A3A3',
    ':hover': {
      color: '#161412',
      background: '#FF7F00',
    },
  },
  buttonActive: {
    color: '#161412',
    background: '#FF7F00',
    ':hover': {
      color: '#161412',
      background: '#FF7F00',
    },
  },
  colors: {
    accent0,
    accent1,
    accent2,
    accent3,
    primary0,
    primary1,
    primary2,
    primary3,
    grayLighter,
    whiteDark,
    grayLight,
    whiteDarker,
    whiteDarkest,
    glt70,
    glt50,
    glt40,
    glt20,
    glt10,
    gray,
    offWhite,

    // white: '#eaefde',
    white: '#ffffff',
    // green: 'rgb(4, 214, 114)',
    // green: 'rgb(56, 205, 56)',
    // red: 'rgb(251, 87, 87)',
    // black: '#000000',
    // offWhite: '#e5e5e5',
    // orange: '#FF7F00',
    // darkGray: '#161412',
    // gray: '#444',
    // lightGray: '#989796',
    // lightLightGray: '#bebebe',
    // lightestGray: '#f2f2f2',
  },
  table: {
    colors: {
      text: '#797979',
      odd: '#f2f2f2',
      even: '#ffffff',
    },
  },
  media: {
    small: '@media (max-width: 420px)',
    medium: '@media (min-width: 421px) and (max-width: 999px)',
    large: '@media (min-width: 1000px)',
  },
  isSmall: () => window.matchMedia(SMALL).matches,
  isMedium: () => window.matchMedia(MEDIUM).matches,
  isLarge: () => window.matchMedia(LARGE).matches,
  isLandscape: () => window.matchMedia(LANDSCAPE).matches,
  isPortrait: () => window.matchMedia(PORTRAIT).matches,
};
