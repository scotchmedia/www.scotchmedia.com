import React from 'react';
import {
  Router,
  Route,
  Link,
  IndexRoute,
  Redirect,
} from 'react-router'
import ViewerQueries from './queries/ViewerQueries';

// import {IndexRoute, Route} from 'react-router';
import Application from './containers/Application';
import Home from './containers/Home';
import TutorialIndex from './containers/TutorialIndex';
import TutorialDetail from './containers/TutorialDetail';
import NotFound from './containers/NotFound';
      // <IndexRoute component={TutorialIndex} queries={ViewerQueries} />

export default (
  <Route path="/" component={Application}>
    <IndexRoute component={Home} />

    <Redirect from="tutorials/express" to="tutorials/express/authentication/1/01" />
    <Redirect from="tutorials/express/authentication" to="tutorials/express/authentication/1/01" />

    <Redirect from="tutorials/meteor" to="tutorials/meteor/blog/1/01" />
    <Redirect from="tutorials/meteor/blog" to="tutorials/meteor/blog/1/01" />

    <Route path="tutorials" renderFailure={() => <NotFound />}>
      <IndexRoute component={TutorialIndex} />
      <Route path=":category/:book/:chapter/:page" component={TutorialDetail} queries={ViewerQueries} />
    </Route>
    <Route path="*" component={NotFound} />
  </Route>
);
