// history.js
let mod;
if (process.browser) {
  const hist = require('history');
  mod = hist.createBrowserHistory({
    /* pass a configuration object here if needed */
  });
}

export default mod;
