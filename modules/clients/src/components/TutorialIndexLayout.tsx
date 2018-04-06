import React from 'react';
import { Head, Link } from 'react-static';

export default class TutorialIndex extends React.Component {

  state = {
    page: 'home',
  }

  render() {
    return (
      <div>
        <Head>
          <title>{this.props.pageTitle}</title>
        </Head>
        <h1>Tutorials</h1>

        <h3>Express</h3>
        <Link to="/tutorials/express/authentication/1/01/">Authentication</Link>

        <h3>Meteor</h3>
        <Link to="/tutorials/meteor/blog/1/01/">Blog</Link>
      </div>
    );
  }
}
