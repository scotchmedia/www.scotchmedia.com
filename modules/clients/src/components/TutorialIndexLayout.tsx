import React from 'react';
// import Styles from '../config/Styles';
import { Link } from 'react-static'
// import Link from '../components/Link';

export default class TutorialIndex extends React.Component {

  state = {
    page: 'home',
  }

  render() {
    return (
      <div>
        <h1>Tutorials</h1>

        <h3>Express</h3>
        <Link to="/tutorials/express/authentication/1/01">Authentication</Link>

        <h3>Meteor</h3>
        <Link to="/tutorials/meteor/blog/1/01">Blog</Link>
      </div>
    );
  }
}
