derby = require 'derby' 

app = module.exports = derby.createApp('error', __filename)
global.app = app  unless derby.util.isProduction

app.serverUse module, 'derby-less'

app.loadViews __dirname + '/views'
app.loadStyles __dirname + '/styles'

app.component require('d-connection-alert')
app.component require('d-before-unload')
app.component require('titanjs/components/t-favicons')
app.component require('titanjs/components/t-google-analytics')
app.component require('titanjs/components/t-google-authorship')
app.component require('titanjs/components/t-image')

require('../app/pages')(app)
