app = require './index'

app.get app.pages.tutorial.href, (page, model, params, next) ->
  page.render "tutorial"

app.get  app.pages.tutorial.href + '/express/:book/:chapter/:section', (page, model, p, next) ->
  next() unless p.section

  model.set '_page.viewName', "express:#{p.book}:#{p.chapter}:#{p.section}"
  model.set '_page.editUrl', "https://github.com/scotchmedia/www.scotchmedia.com/blob/master/md/tutorials/express/#{p.book}/#{p.chapter}/#{p.section}.md"
  page.render "tutorial-express"

app.get  app.pages.tutorial.href + '/meteor/:book/:chapter/:section', (page, model, p, next) ->
  next() unless p.section
  model.set '_session.openBrackets', '{{'
  model.set '_page.editUrl', "https://github.com/scotchmedia/www.scotchmedia.com/blob/master/md/tutorials/meteor/#{p.book}/#{p.chapter}/#{p.section}.md"
  model.set '_page.viewName', "meteor:#{p.book}:#{p.chapter}:#{p.section}"
  page.render "tutorial-meteor"
