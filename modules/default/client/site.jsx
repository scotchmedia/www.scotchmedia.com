import 'babel-polyfill';
// require('es6-promise').polyfill();
import 'isomorphic-fetch';

// import './styles/site.less';
import './styles/stylus/index.styl';
import history from './lib/history';
import React from 'react';
import ReactDOM from 'react-dom';
import {RelayRouter} from 'react-router-relay';
import routes from './routes';

const root = document.getElementById('root')
ReactDOM.render(
  <RelayRouter
    forceFetch
    history={history}
    onUpdate={() => window.scrollTo(0, 0)}
    routes={routes}
    />,
  root
);
