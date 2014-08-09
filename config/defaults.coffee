module.exports =
  env: "development"
  port: 3000

  mongo:
    url: "mongodb://localhost:27017/sm"

  session:
    secret: "1f831baf8fd1b9cc80b7ba0e830609b09187d2a0"
    cookie: "b2e8b4bf180e12f8c80bd8306a3409b09188e4c6"

  # Settings are exsposed to the client.
  settings:
    site:
      url: 'http://www.scotchmedia.com'
      name: "Scotch Media"
      description: "An interactive media studio, specialzing in user interface design, graphic design, and web development"
      email: "Scotch Media <hello@scotchmedia.com>"
      text: "Drop us a line, say hello or request more information."
      showAddress: true
      baseUrl: "http://www.scotchmedia.com"
      phone: "785-SCOTCHMEDIA"

  mailer:
    defaultFromAddress: "Scotch Media <hello@scotchmedia.com>"
    transport:
      type: "SMTP"
      options:
        service: "MailGun"
        auth:
          user: "postmaster@scotchmedia.com"
          pass: "pass"

  contact:
    text: ""
