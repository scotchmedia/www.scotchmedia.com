derby = require 'derby' 

app = module.exports = derby.createApp('error', __filename)
global.app = app  unless derby.util.isProduction

app.serverUse module, 'derby-less'

app.serverUse module, "derby-stylus"

app.use require('d-material')

app.component require('d-connection-alert')
app.component require('d-before-unload')
app.component require('titanjs/components/t-favicons')
app.component require('titanjs/components/t-google-analytics')
app.component require('titanjs/components/t-google-authorship')
app.component require('titanjs/components/t-heroku-keep-alive')

app.loadViews __dirname + '/views'
app.loadStyles __dirname + '/../app/styles'


require('../app/pages')(app)
