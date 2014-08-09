module.exports = {
  // db collection
  collection: 'auths',
  // projection of db collection
  publicCollection: 'users',
  // passportjs options
  passport: {
    successRedirect: '/',
    failureRedirect: '/',
    registerCallback: function(req, res, user, done) {
      var model = req.getModel();
      var $user = model.at('auths.' + user.id);
      model.fetch($user, function() {
        $user.set('email', $user.get('local.email'), done);
      });
    }
  },
  strategies: {
    google: {
      strategy: require('passport-google-oauth').OAuth2Strategy,
      conf: {
        clientID: '1060568558513-164eli9jaaf8nbjgv4asv3gutn72usl6.apps.googleusercontent.com',
        clientSecret: 'lqYJ1NF1AEeAA07MUGrIynXD',
        callbackURL: 'http://localhost:3000/auth/google/callback',
        scope: 'https://www.googleapis.com/auth/plus.login'
      }
    },
  },
  // projection
  user: {
    id: true,
    email: true
   }
}