moment = require 'moment'

String::startsWith ?= (s) -> @slice(0, s.length) == s

module.exports = (app) ->
  app.pages =
    home:
      title: 'Home'
      href: '/'
    # about:
    #   title: 'About'
    #   href: '/about'
    # contact:
    #   title: 'Contact'
    #   href: '/contact'
    # projects:
    #   title: 'Projects'
    #   href: '/projects'
    # posts:
    #   title: 'Blog'
    #   href: '/blog'
    tutorial:
      title: 'Tutorials'
      href: '/tutorials'


  app.defaultShareMessage = (model, doc, url) ->
    msg = undefined
    site = model.get("_settings.site")
    siteTitle = site?.name
    siteUrl = site?.url
    title = (if doc.title then doc.title else "this")
    if doc.title
      msg = "Check Out '#{doc.title}' by #{siteTitle}"
    else
      msg = "Check this out. It's by " + siteTitle
    msg + "\n ( " + siteUrl + url + " )"

  ## CONTROLLER FUNCTIONS ##

  app.proto.create = (model) ->
    # document.getElementsByTagName("a").forEach((a) ->
    #   console.log 'a', a
    #   a.addEventListener("click", (e) ->
    #     console.log 'e', e
    #     window.scrollTo 0, 0
    #   )
    # )

  app.proto.mailTo = () ->
    window.location.href = "mailto:Hello@ScotchMedia.com";

  app.proto.changeUrl = (url) ->
    app.history.push '' + url

  app.proto.changeUrlWithId = (url, id) ->
    app.history.push '' + url + (id if id)

  app.proto.create = (model) ->
    # require '../../public/bower_components/jquery/jquery.min'

  app.proto.copyWrite = () ->
    "© #{new Date().getFullYear()} ScotchMedia.com. All rights reserved"

  app.proto.navItems = (current) ->
    items = []
    for name, page of app.pages
      items.push
        title: page.title
        href: page.href
        # isCurrent: current == dash(name)
        isCurrent: current.startsWith(dash(name))
    items[items.length - 1].isLast = true
    return items

  app.proto.pageTitle = (current) ->
    return app.pages[current]?.title

  app.proto.dash = dash = (camelName) ->
    return camelName.replace /[a-z][A-Z]/g, (match) ->
      match.charAt(0) + '-' + match.charAt(1).toLowerCase()

  app.proto.equal = (a, b) ->
    return a == b

  app.proto.not = (value) ->
    return !value

  app.proto.formatDate = (date, format) ->
    return ""  unless date
    format = format or "YYYY-MM-DD"
    moment(new Date(date)).format format

  app.proto.timeSince = (date) ->
    moment(date).fromNow()
