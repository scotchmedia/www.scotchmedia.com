import Radium from 'radium';
import React from 'react';
import Styles from '../config/Styles';
import Link from '../components/Link';


// const menuMaxWidth = 300;
const styles = {
  container: {
    fontWeight: 100,
    transition: '200ms ease-in',
    [Styles.media.large]: {
    },
  },
  inner: {
    width: '100%',
    [Styles.media.large]: {
    },
    [Styles.media.medium]: {
    },
  },
  ul: {
    listStyle: 'none',
    paddingLeft: 8,
  },
  li: {
    marginBottom: 8,
    fontSize: 16,
    color: '#5ab9b9',
  },
  subheader: {
    marginBottom: 0,
  },
};

@Radium
export default class Home extends React.Component {
  static propTypes = {
    history: React.PropTypes.object.isRequired,
  }

  state = {
    page: 'home',
  }

  renderLink(link, i) {
    return (
      <li key={'key_' + link + i} style={styles.li}>
        <a target="_blank" href={link.url}>{link.title}</a>
      </li>
    );
  }

  render() {
    const nav = [
      {title: 'Projects', url: '/projects'},
      {title: 'About', url: '/about'},
      {title: 'Design', url: '/about'},
    ];
    const pLinks = [
      {title: 'Title Farm', url: 'https://titlefarm.com'},
      {title: 'Vibereel', url: 'http://vibereel.com'},
    ];
    const projects = pLinks.map(this.renderLink);
    const osLinks = [
      {title: 'Angular Brunch Seed', url: 'https://github.com/scotch/angular-brunch-seed'},
      {title: 'EngineAuth', url: 'http://code.scotchmedia.com/engineauth/docs/index.html'},
    ];
    const os = osLinks.map(this.renderLink);

    return (
      <div style={styles.container}>
        <h3 style={styles.subheader}>
          Recent Projects
        </h3>
        <ul style={styles.ul}>
          {projects}
        </ul>
        <h3 style={styles.subheader}>
          Open Source
        </h3>
        <ul style={styles.ul}>
          {os}
        </ul>
      </div>
    );
  }
}

          // {this.renderFooter()}
