app = require './index'

app.get app.pages.home.href, (page, model, params, next) ->
  page.render 'tutorials'
