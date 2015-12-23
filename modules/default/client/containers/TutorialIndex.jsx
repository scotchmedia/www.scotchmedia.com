import Radium from 'radium';
import React from 'react';
import Styles from '../config/Styles';
import Link from '../components/Link';

const styles = {
  container: {
  },
};

@Radium
export default class TutorialIndex extends React.Component {
  static propTypes = {
    history: React.PropTypes.object.isRequired,
  }

  state = {
    page: 'home',
  }

  render() {
    return (
      <div style={styles.container}>
        <h1>Tutorials</h1>

        <h3>Express</h3>
        <Link to="/tutorials/express/authentication">Authentication</Link>

        <h3>Meteor</h3>
        <Link to="/tutorials/meteor/blog">Blog</Link>
      </div>
    );
  }
}
