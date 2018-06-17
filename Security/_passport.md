
# Passport



## Passport
Each authorization server has their own way of doing `oauth`, `passport` standardizes most use cases using strategies e.g. `passport-google`, `passport-facebook`, etc.


```js
import Express from 'express'
import passport from './passport'
import passportGoogle from 'passport-google-oauth'

const app = new Express()


app.use(passport.initialize())
app.use(passport.session())

// places a user object into the session
passport.serializeUser(function(user, done) {
  // we don't want to store errors into the session
  // and usually we only save the user.id
  done(null, user)
})

// used to pull back user out of a session
passport.deserializeUser(function(user, done) {
  // usually we store only the userID and pull it out of the DB
  // User.findById(userID, function(err, user) {
  //   done(err, user);
  // })
  done(null, user)
})

// Google Strategy
const GoogleStrategy = passportGoogle.OAuth2Strategy

passport.use(new GoogleStrategy({
    // this are token we'll setup to let google know who we are
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // what google will redirect the user to when done
    callbackURL: process.env.DOMAIN + '/auth/google/callback'
  },
  // will call this function once the user comes back from google
  function(token, tokenSecret, profile, done) {
    // retrieve user ...
    done(null, profile)
  }
))

app.get('/google', passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  })
)

// handle the callback
router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/auth'
}))
```
