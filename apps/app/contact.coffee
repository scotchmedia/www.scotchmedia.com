app = require './index'
# notify = require 'titanjs/notify'
# methods = require 'titanjs/methods'

# app.get app.pages.contact.href, (page, model, params, next) ->
#   page.render "contact"

# # Post route for browsers that don't support javascript
# app.post app.pages.contact.href, (page, model, {body, query}) ->
#   msg = body.message

#   console.log 'on sever'
#   # Sending data to the server, getting result as a response
#   app.model.channel.send "myEvent", msg, (result) ->
#     console.log 'result', result
#     #
#     # Handle the response, if needed, callback is not required.
#     #
#     err = null
    
#     if err
#       # If there was an error then save the users input
#       model.set "_page.message", msg
#       # Notify the user of the error
#       notify.error err  if err
#       notify.error "There was a problem sending your message. Please try again."
#     else
#       notify.success "Your message was sent successfully.
#                       Thank for your interest. We will be contacting you soon."
#       # clear the form
#       model.del "_page.newMsg"
#       # notify.success "Your message was sent successfully.\nThank for your
#       # interest. We will be contacting you soon."
#       page.render 'contact'

#   # Should we validate before sending? Is it more sucure to validate on the
#   # server?
#   # methods.call 'contact', msg, (err, result) ->
#   #   if err
#   #     # If there was an error then save the users input
#   #     model.set "_page.message", msg
#   #     # Notify the user of the error
#   #     notify.error err  if err
#   #     notify.error "There was a problem sending your message. Please try again."
#   #   else
#   #     notify.success "Your message was sent successfully.
#   #                     Thank for your interest. We will be contacting you soon."
#   #     # clear the form
#   #     model.del "_page.newMsg"
#   #     # notify.success "Your message was sent successfully.\nThank for your
#   #     # interest. We will be contacting you soon."
#   #     page.render 'contact'

# app.component 'contact', class Contact
#   init: ->
#     @model.set 'message', @model.root.get('_page.message')
