import history from './lib/history';
import React from 'react';
import Routes from 'react-static-routes';
import Styles from './config/Styles';
import { css } from 'glamor';
import { hot } from 'react-hot-loader';
import { Link, Router } from 'react-static';
import ReactGA from 'react-ga';


ReactGA.initialize('UA-28149225-1');
const onPageView = () => {
  ReactGA.pageview(window.location.pathname + window.location.search);
};


import './styles/base.css';

const siteDescription = 'An interactive media studio, specialzing in user interface design, graphic design, iOS development, Android development and web development';

const styles = {
  container: css({
    width: '100%',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: '200ms ease-in',
  }),
  inner: css({
    // width: '100%',
    display: 'flex',
    padding: 16,
    [Styles.media.small]: {
      flex: 1,
    },
    [Styles.media.medium]: {
      flex: 1,
      margin: '0 auto',
    },
    [Styles.media.large]: {
      // maxWidth: 1180,
      margin: '0 auto',
      width: 1180,
      // alignContent: 'center',
      padding: 0,
    },
  }),
  header: {
    container: css({
      backgroundColor: Styles.header.backgroundColor,
    }),
    inner: css({
      flexDirection: 'column',
    }),
    top: css({
      display: 'flex',
      flexDirection: 'column',
      marginTop: 16,
      marginBottom: 16,
      [Styles.media.medium]: {
        flexDirection: 'row',
      },
      [Styles.media.large]: {
        flexDirection: 'row',
      },
    }),
    logo: {
      container: css({
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        [Styles.media.medium]: {
          justifyContent: 'flex-start',
        },
        [Styles.media.large]: {
          justifyContent: 'flex-start',
        },
      }),
      logo: css({
        width: 280,
        height: 'auto',
        fill: Styles.colors.offWhite,
      }),
    },
    email: css({
      display: 'flex',
      alignSelf: 'center',
      ':hover': {
        color: Styles.colors.white,
      },
    }),
  },
  nav: {
    container: css({
      display: 'flex',
      listStyleType: 'none',
      // maxHeight: 20,
      flexDirection: 'row',
      paddingTop: 16,
      paddingBottom: 16,
      justifyContent: 'center',
      [Styles.media.medium]: {
        justifyContent: 'flex-start',
      },
      [Styles.media.large]: {
        justifyContent: 'flex-start',
      },
    }),
  },
  content: {
    container: css({
      display: 'flex',
      flex: 1,
      // justifyContent: 'center',
    }),
  },
  footer: {
    container: css({
      paddingTop: 22,
      display: 'flex',
      flexDirection: 'column',
      color: Styles.colors.glt50,
      backgroundColor: Styles.colors.glt10,
      justifyContent: 'center',
    }),
    inner: css({
      display: 'flex',
      flexDirection: 'column',
      [Styles.media.medium]: {
        flexDirection: 'row',
      },
      [Styles.media.large]: {
        flexDirection: 'row',
      },
    }),
    logo: css({
      maxWidth: 200,
      height: 'auto',
      fill: Styles.colors.glt70,
    }),
    copy: css({
      fontSize: 12,
      backgroundColor: Styles.colors.glt10,
      color: Styles.colors.glt40,
      paddingTop: 16,
      paddingBottom: 16,
      // justifyContent: 'center',
      // alignItems: 'center',
      // textAlign: 'center',
    }),
    group: css({
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      [Styles.media.medium]: {
        flex: 1,
        alignItems: 'flex-start',
      },
      [Styles.media.large]: {
        flex: 1,
        alignItems: 'flex-start',
      },
    }),
  }
};

// @Radium
class App extends React.Component {
  state = {
    mobileNavIsOpen: false,
  }

  unlisten = null;

  componentDidMount = () => {
    onPageView();
    // Listen for changes to the current location.
    this.unlisten = history.listen((location, action) => {
      // location is an object like window.location
      console.log(action, location.pathname, location.state)
      onPageView();
    })
  }

  componentWillUnmount = () => {
    // To stop listening, call the function returned from listen().
    this.unlisten();
  }

  render() {
    const {children} = this.props;
    const navItems = [
      {
        title: 'Home',
        href: '/',
        isIndex: false,
      },
      {
        title: 'Tutorials',
        href: '/tutorials',
        isIndex: true,
      },
    ];
    const nav = navItems.map((item, i) => {
      return (
        <li className="Nav-item"
          key={`key_${item.href}_${i}`}
          >
          <Link
            // onlyActiveOnIndex={item.isIndex}
            key={`key_link_${item.to}_${i}`}
            className={`${Styles.navLink}`}
            activeStyle={{ color: '#ffffff'}}
            // activeClassName={`${Styles.navLink[':active']}`}
            exact={item.href === '/' ? true : false}
            to={item.href}
            >
            {item.title}
          </Link>
        </li>
      );
    })
    return (
      <Router history={history}>
        <div className={styles.container}>
          <header className={styles.header.container}>
            <div className={`${styles.inner} ${styles.header.inner}`}>
              <div className={styles.header.top}>
                <a className={styles.header.logo.container} href="/">{this.renderLogo(styles.header.logo.logo, 'main-logo', 'Scotch Media')}</a>
                <a className={styles.header.email} href="mailto:hello@scotchmedia.com"> hello@scotchmedia.com </a>
              </div>
              <nav className={styles.nav.container}>
                {nav}
              </nav>
            </div>
          </header>
          <div className={styles.content.container}>
            <div className={styles.inner}>
              <Routes />
            </div>
          </div>
          <footer className={styles.footer.container}>
            <div className={`${styles.inner} ${styles.footer.inner}`}>
              <div className={styles.footer.group}>
                {this.renderLogo(styles.footer.logo, 'footer-logo', 'Scotch Media')}
                <p>{siteDescription}</p>
              </div>
              <div className={styles.footer.group}>
              </div>
              <div className={styles.footer.group}>
              </div>
            </div>
            <div className={styles.footer.copy}>
              <div className={`${styles.inner} ${styles.footer.inner}`} style={{justifyContent: 'center'}}>
                <small>{`© ${new Date().getFullYear()} ScotchMedia.com. All rights reserved`}</small>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    );
  }

  renderLogo(style, color, id, ariaLabel) {
    return (
      <svg id={id} className={style} aria-label={ariaLabel} x="0px" y="0px" width="406.859px" height="62.087px" viewBox="0 0 406.859 62.087">
        <g>
          <path d="M45.439,23.92c-3.155,0-5.545-1.533-5.545-4.118c0-2.866,2.103-3.729,2.103-5.932
            c0-2.195-1.818-5.547-6.312-5.547c-5.166,0-10.429,3.061-10.429,7.85c0,4.109,2.011,6.983,8.705,12.144l1.915,1.532
            c7.08,5.553,9.663,9.758,9.663,15.208c0,10.146-11.578,17.031-25.065,17.031C8.61,62.087,0,56.06,0,48.601
            c0-4.403,2.964-7.178,6.6-7.178c4.785,0,5.646,3.542,5.646,5.741c0,2.011-1.724,3.349-1.724,5.837
            c0,2.677,4.113,5.738,10.429,5.738c9.376,0,13.106-3.925,13.106-9.949c0-3.825-2.298-6.026-9.567-12.339l-1.434-1.243
            c-4.975-4.305-9.279-7.752-9.279-15.117c0-8.416,10.426-15.117,21.428-15.117c8.228,0,15.976,4.592,15.976,11.481
            C51.181,20.953,48.98,23.92,45.439,23.92z"/>
          <path d="M79.114,33.282c0.132-0.938-1.541,7.488-1.541,8.038c0,0.795-0.476,1.819-1.899,3.714
            c-3.635,4.819-10.272,7.271-15.958,7.271c-7.349,0-11.458-4.659-11.458-12.009c0-9.876,9.797-20.781,21.333-20.781
            c5.296,0,9.245,2.449,9.245,6.793c0,3.164-1.262,5.692-4.108,5.692c-2.448,0-3.712-1.659-3.712-3.477
            c0-2.132,1.501-3.239,1.501-4.661c0-1.109-0.711-2.056-1.817-2.056c-6.955,0-11.461,9.797-11.461,18.964
            c0,4.581,3.241,6.635,5.691,6.635c3.081,0,6.479-1.42,9.639-5.372C74.963,41.558,78.835,35.299,79.114,33.282z"/>
          <path d="M98.557,19.515c7.823,0,12.325,4.585,12.325,11.537c0,10.034-7.899,21.333-21.413,21.333
            c-7.743,0-12.089-4.501-12.089-11.064c0-9.083,7.983-21.805,20.862-21.805H98.557z M96.899,21.963
            c-5.453,0-9.008,14.699-9.008,22.36c0,3.4,1.42,5.295,3.555,5.295c4.898,0,8.929-14.618,8.929-22.359
            c0-3.638-1.739-5.296-3.397-5.296H96.899z"/>
          <path d="M117.467,20.305l0.949-4.818c0.319-2.056,0.632-2.372,2.134-2.372h4.978l2.136-0.238h1.025
            c0.788,0,1.185,0.316,1.185,0.871c0,0.235-0.079,0.554-0.159,0.787l-1.975,5.77h6.795c0.555,0,0.871,0.397,0.871,1.03
            c0,0.947-0.316,2.213-1.03,2.213h-7.663l-4.818,17.538c-0.238,0.869-0.632,3.238-0.632,4.266c0,1.818,1.104,2.844,2.369,2.844
            c2.134,0,4.386-0.307,6.561-3.079c2.149-2.743,1.165-7.076,1.936-7.246c3.694-0.809,0.829,6.378,0.829,6.852
            c0,0.63-1.105,2.211-2.448,3.556c-2.843,2.766-6.324,4.027-11.459,4.027c-4.976,0-7.821-2.528-7.821-6.477
            c0-1.423,0.393-4.03,1.186-6.877l4.185-15.403h-4.501c-0.397,0-0.63-0.478-0.63-1.584c0-1.105,0.393-1.659,1.185-1.659H117.467z"/>
          <path d="M165.578,36.567c0.946,0,1.34,0.475,1.34,1.024c0,0.795-0.473,1.818-1.894,3.715
            c-3.635,4.818-9.191,10.998-21.878,10.998c-7.347,0-11.454-4.659-11.454-12.009c0-9.876,9.796-20.781,21.333-20.781
            c5.294,0,9.244,2.449,9.244,6.793c0,3.164-1.266,5.692-4.109,5.692c-2.45,0-3.714-1.659-3.714-3.477
            c0-2.132,1.504-3.239,1.504-4.661c0-1.109-0.712-2.056-1.818-2.056c-6.953,0-11.459,9.797-11.459,18.964
            c0,4.581,3.241,6.635,5.691,6.635c6.319,0,13.501-4.375,16.66-11.557C165.273,35.284,164.866,36.567,165.578,36.567z"/>
          <path d="M186.239,29.945c0.313-1.025,0.633-2.526,0.552-3.476c-0.152-1.423-1.103-2.135-2.055-2.135
            c-2.371,0-6.793,4.188-8.772,7.426c0,0-0.235,0.476-0.313,0.872l-4.979,17.778c-0.319,1.027-0.552,1.103-1.66,1.103h-7.347
            c-0.789,0-1.106-0.075-1.106-0.471c0-0.239,0-0.475,0.159-1.106l11.928-43.3c0.24-0.95,0.318-1.737,0.318-2.37
            c0-0.713-0.154-1.423-2.524-1.423c-2.136-0.081-2.61-0.709-2.61-1.342c0-0.709,0.553-1.267,1.266-1.267L183,0
            c1.185,0,1.581,0.235,1.581,0.868c0,0.552-0.715,2.131-1.423,4.583c0,0-1.423,4.896-1.819,6.162l-4.341,15.409l0.947-1.109
            c3.162-3.712,7.664-6.477,11.06-6.477c3.717,0,7.587,2.765,7.587,8.613c0,1.422-0.478,2.924-0.873,4.265l-4.9,18.736
            c-0.237,0.867-0.476,1.816-0.476,2.686c0,0.87,0.476,1.5,1.581,1.5c1.022,0,3.315-1.657,4.896-5.137
            c0.239-0.472,0.633-1.184,1.342-1.184c0.872,0,1.109,0.395,1.109,0.79c0,2.372-4.5,10.115-12.483,10.115
            c-3.238,0-5.927-3.479-5.927-6.954c0-1.737,0.4-3.316,0.709-4.584L186.239,29.945z"/>
          <path d="M227.435,16.339c0-4.345-1.188-7.111-4.981-7.111h-1.342l0.163-2.451l15.717-0.393l10.673,34.685
            l10.428-15.485c4.977-7.428,7.585-11.615,11.615-18.33l0.472-0.79h8.384l6.706,0.312l-0.149,2.295l-0.553,0.156
            c-2.773,0.397-3.802,0.473-4.824,3.242c-0.795,2.057-1.659,4.662-3.007,12.639l-2.447,14.224c-0.395,2.212-1.027,7.032-1.027,8.139
            c0,2.057,0.795,1.737,4.188,1.897l0.478,0.076c1.103,0.16,1.342,0.87,1.342,1.423c0,0.792-0.32,1.189-1.499,1.189l-3.95-0.162
            c-1.422-0.081-5.215-0.081-6.244-0.081h-6.081l-0.79,0.163c-1.665,0.08-2.218,0.08-3.56,0.08h-0.317
            c-1.024,0-1.267-0.397-1.267-0.952c0-0.79,0.242-1.5,1.505-1.577c3.559-0.24,4.505-0.712,6.085-10.114l3.474-20.943l-15.013,22.524
            c-3.713,5.608-6.081,9.952-7.106,11.929h-3.872l-0.558-2.213c-1.104-4.346-9.554-31.764-9.554-31.764h-0.163l-0.314,2.451
            c-1.108,5.689-4.627,15.961-5.735,19.754c-0.395,1.419-1.185,3.791-1.816,5.608c-3.242,9.401-6.164,14.062-10.032,14.062
            c-2.374,0-4.668-0.788-4.668-3.713c0-2.056,1.347-3.556,3.084-3.556c0.628,0,1.508,0.314,2.37,0.314
            c3.321,0,5.846-6.005,8.219-13.745c1.74-5.771,5.738-20.305,5.971-23.47V16.339z"/>
          <path d="M311.537,32.088c0.665,0.57-1.293,8.651-1.293,9.203c0,2.687-8.854,11.632-17.862,11.632
            c-7.188,0-11.216-3.715-11.216-10.589c0-8.137,8.056-22.2,21.646-22.2c4.82,0,7.19,3,7.19,6.083
            c0,5.373-4.426,10.745-17.859,13.272c0,0-0.475,2.055-0.475,3.479c0,3.318,2.051,5.056,4.111,5.056
            c4.582,0,7.437-2.121,10.588-5.767C308.423,39.869,311.283,31.869,311.537,32.088z M302.889,26.373
            c0-2.843-1.423-3.477-2.613-3.477c-3.55,0-6.557,8.538-7.737,14.148C299.339,35.7,302.889,30.482,302.889,26.373z"/>
          <path d="M308.969,41.623c0-10.032,8.771-21.415,21.257-21.415c3.079,0,5.369,1.743,5.369,1.743l0.878-3.242
            c1.972-7.267,2.917-12.801,2.917-13.824c0-0.871-0.713-1.347-1.502-1.347c-1.027,0-3.079,0.157-3.079,0.157
            c-0.714,0-1.027-0.551-1.027-1.499c0-0.87,1.417-1.189,4.82-1.189l9.321-0.156c0.791,0,1.347-0.078,1.585-0.154h0.862
            c0.56,0,0.87,0.238,0.87,0.629c0,0.237-0.391,1.662-1.104,4.111l-1.575,5.449l-7.433,27.657c-1.185,4.345-1.424,5.767-1.424,7.269
            c0,1.345,0.559,2.212,1.662,2.212c5.798,0,10.534-11.039,11.719-13.887l0.476-1.104c0.395-0.869,0.552-0.793,1.185-0.793
            c0.709,0,1.265,0.479,1.265,0.876c0,0.472-0.16,0.947-0.713,1.972c-2.526,5.371-6.964,17.835-19.38,17.835
            c-4.743,0-5.768-6.876-5.768-6.876c-2.217,3.321-6.72,6.954-11.614,6.954C312.133,53.001,308.969,48.579,308.969,41.623z
             M334.018,27.721c0.077-0.161,0.32-1.503,0.32-1.503c0-1.818-1.505-3.24-3.717-3.24c-5.529,0-11.14,14.224-11.14,21.096
            c0,3.083,1.26,4.819,3.474,4.819c2.532,0,6.167-3.398,7.666-8.927L334.018,27.721z"/>
          <path d="M360.249,44.388c-0.239,0.869-0.396,1.659-0.396,2.448c0,1.348,0.791,1.817,1.58,1.817
            c1.66,0,3.043-2.073,4.03-4.025c1.508-2.98,2.841-8.761,3.402-8.761c0.629,0-0.956,7.494-0.956,7.809
            c0,1.896-3.87,9.325-10.584,9.325c-3.873,0-6.955-2.924-6.955-7.583c0-1.345,0.717-4.032,1.188-5.767l3.637-12.646
            c0.153-0.552,0.233-1.106,0.233-1.578c0-1.58-0.552-1.58-1.185-1.58c-1.107,0-2.607,0.945-3.95,4.029l-0.233,0.55
            c-0.396,0.95-0.79,1.346-1.423,1.346c-0.395,0-0.946-0.239-0.946-0.633c0-2.529,3.55-8.932,9.949-8.932
            c2.841,0,6.953,2.77,6.953,7.513c0,1.5-0.32,3.079-0.786,4.817L360.249,44.388z M362.066,14.289c-2.927,0-4.9-2.139-4.9-5.061
            c0-3.239,2.527-5.847,5.377-5.847c2.761,0,5.133,2.213,5.133,5.139C367.675,11.519,364.912,14.289,362.066,14.289z"/>
          <path d="M393.509,22.264l0.157-0.71c0.236-1.104,1.421-1.104,2.6-1.184c0,0,4.354-0.077,4.982-0.236
            l1.108-0.238c1.027-0.16,1.579-0.235,1.97-0.235c0.324,0,0.558,0.157,0.558,0.473s-1.5,5.689-2.37,9.005
            c-1.027,3.871-3.082,12.565-3.082,12.565c-0.554,2.132-0.949,4.343-0.949,5.213c0,1.186,0.635,1.661,1.743,1.661
            c1.342,0,3.073-2.767,4.024-4.742l0.4-0.791c0.311-0.788,0.552-1.105,1.422-1.105c0.469,0,0.786,0.395,0.786,0.791
            c0,0.392-0.233,1.263-0.71,2.29c-0.714,1.504-1.659,3.003-2.607,4.267c-1.897,2.291-3.239,3.636-7.822,3.636
            c-3.315,0-5.926-1.896-7.271-6.479c-3.235,4.897-7.976,6.558-11.059,6.558c-5.221,0-10.036-4.108-10.036-10.667
            c0-10.43,9.48-22.126,20.619-22.126C391.137,20.208,393.509,22.264,393.509,22.264z M377.861,44.31
            c0,3.554,1.822,4.583,3.479,4.583c2.921,0,6.718-5.217,8.132-9.64c1.352-4.107,3.008-10.904,3.401-13.43
            c0,0-1.028-2.846-4.029-2.846C383.871,22.978,377.861,34.988,377.861,44.31z"/>
        </g>
      </svg>
    );
  }
}

export default hot(module)(App)
