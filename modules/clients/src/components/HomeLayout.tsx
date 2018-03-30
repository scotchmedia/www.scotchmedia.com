import React from 'react';
import { css } from 'glamor';
import { Head } from 'react-static';


// const menuMaxWidth = 300;
const styles = {
  container: css({
    fontWeight: 100,
    transition: '200ms ease-in',
  }),
  inner: css({
    width: '100%',
  }),
  ul: css({
    listStyle: 'none',
    paddingLeft: 8,
  }),
  li: css({
    marginBottom: 8,
    fontSize: 16,
    color: '#5ab9b9',
  }),
  subheader: css({
    marginBottom: 0,
  }),
};

// @Radium
export default class Home extends React.Component {
  state = {
    page: 'home',
  }

  renderLink(link, i) {
    return (
      <li key={'key_' + link + i} className={styles.li}>
        <a target="_blank" href={link.url}>{link.title}</a>
      </li>
    );
  }

  render() {
    const nav = [
      { title: 'Projects', url: '/projects' },
      { title: 'About', url: '/about' },
      { title: 'Design', url: '/about' },
    ];
    const pLinks = [
      { title: 'Title Farm', url: 'https://titlefarm.com' },
      { title: 'Vibereel', url: 'http://vibereel.com' },
    ];
    const projects = pLinks.map(this.renderLink);
    const osLinks = [
      { title: 'Angular Brunch Seed', url: 'https://github.com/scotch/angular-brunch-seed' },
      { title: 'EngineAuth', url: 'http://code.scotchmedia.com/engineauth/docs/index.html' },
    ];
    const os = osLinks.map(this.renderLink);

    return (
      <div className={styles.container}>
        <Head>
          <title>Scotch Media</title>
        </Head>
        <h3 className={styles.subheader}>
          Recent Projects
        </h3>
        <ul className={styles.ul}>
          {projects}
        </ul>
        <h3 className={styles.subheader}>
          Open Source
        </h3>
        <ul className={styles.ul}>
          {os}
        </ul>
      </div>
    );
  }
}

          // {this.renderFooter()}
