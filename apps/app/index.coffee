derby = require('derby')
app = module.exports = derby.createApp('app', __filename)

global.app = app  unless derby.util.isProduction

app.serverUse module, 'derby-markdown', require('../../config/markdown')
app.serverUse module, "derby-stylus"

app.use require('d-material')
app.component require('titanjs/components/t-favicons')
app.component require('titanjs/components/t-google-analytics')
app.component require('titanjs/components/t-google-authorship')
app.component require('titanjs/components/t-heroku-keep-alive')

app.loadViews __dirname + '/views'
app.loadStyles __dirname + '/styles'

require('./pages')(app)

require './tutorials'
require './home'
# require './contact'
