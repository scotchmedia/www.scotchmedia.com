methods = require "titanjs/methods"
config = require("titanjs/config")()
email = require "titanjs/email"

module.exports = ->
  methods.register 'contact', contactMethod

contactMethod = (msg, cb) ->
  return cb "Please provide your name"  unless msg.name
  return cb "Please provide your email address"  unless msg.email
  return cb "Please provide a message"  unless msg.message

  from = "#{msg.name} <#{msg.email}>"
  subject = "Message from #{msg.name}"
  html = """
    <br/>
    #{msg.message}
    <br/>
    <br/>
    <strong>Name</strong>: #{msg.name}
    <br/>
    <strong>Email</strong>: #{msg.email}
    <br/>
    <strong>Phone</strong>: #{msg.phone}
    <br/>
  """
  opts =
    from: from
    to: config.get("site.email")
    replyTo: from
    subject: subject
    html: html
    generateTextFromHTML: true

  email.send opts, (err, responseStatus, html, text) ->
    if err
      cb "failed: #{err}"
    else
      cb null, 'Message Sent Successfully'
