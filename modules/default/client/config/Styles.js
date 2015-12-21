const PORTRAIT = '(orientation:portrait)';
const LANDSCAPE = '(orientation:landscape)';
const SMALL = 'only screen and (max-width: 420px)';
const MEDIUM = 'only screen and (min-width: 421px) and (max-width: 999px)';
const LARGE = 'only screen and (min-width: 1000px)';

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
  navLink: {
    color: '#3f51b5',
    // paddingRight: 10,
    // paddingLeft: 10,
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
    white: '#ffffff',
    green: 'rgb(4, 214, 114)',
    // green: 'rgb(56, 205, 56)',
    red: 'rgb(251, 87, 87)',
    black: '#000000',
    offWhite: '#e5e5e5',
    orange: '#FF7F00',
    darkGray: '#161412',
    gray: '#444',
    lightGray: '#989796',
    lightLightGray: '#bebebe',
    lightestGray: '#f2f2f2',
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
