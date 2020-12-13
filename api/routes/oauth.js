const router = require('express').Router();
const db = require("../mongodb/connection");
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const strategy = require("passport-facebook");
const FacebookStrategy = strategy.Strategy;

const GOOGLE_CLIENT_ID = '10402001941-iplgmi34fo8q4eg3elq114cfklp41u65.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'R7ZqmUbsOmdKIl0VmqWqZigG';

// router.use(cors());
router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

passport.use(new FacebookStrategy({
  clientID: "198425565195082",
  clientSecret: "76021f6d915ab91d1b517a2cc76ba0d6",
  callbackURL: "http://localhost:5000/users/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'emails']
}, function (accessToken, refreshToken, profile, done) {
  return done(null, profile);
}
));

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/users/auth/google/callback"
},
  function (accessToken, refreshToken, profile, done) {
    userProfile = profile;
    return done(null, userProfile);
  }
));

function ownMiddleware(req, res, next) {
  global.provider = req.params.provider;
  passport.authenticate(global.provider)
  next()
}

router.get('/:provider', function (req, res) {
  if (req.params.provider === "google") {
    passport.authenticate("google", { scope: ['profile', 'email'] })(req, res);
  } else if (req.params.provider === "facebook") {
    passport.authenticate("facebook", { scope: ['email'] })(req, res);
  } else {
    res.status(400).end(JSON.stringify({ message: "Provider not define" }));
  }
});

router.get("/:provider/callback", ownMiddleware, (req, res, next) => {
  passport.authenticate(global.provider, { scope: ['email'] })(req, res, next);
}, (req, res) => {
  let mail = res.req.user.emails[0].value;
  let nickname = res.req.user.displayName;
  let password = res.req.user.id;
  let JsonObj = {};
  db.get().collection("users").find({ $or: [{ nickname }, { mail }] }).toArray(function (err, result) {
    if (result.length === 0) {
      bcrypt.hash(password, 10, function (err, hash) {
        let newUser = { "body": {} };
        newUser.body.mail = mail;
        newUser.body.password = hash;
        newUser.body.nickname = nickname;
        newUser.body.currencies = "eur";
        newUser.body.listCrypto = [];
        newUser.body.listWeb = [];
        newUser.body.right = 0;
        db.get().collection("users").insertOne(newUser.body, function (err, ress) {
          if (err) throw err;
          db.get().collection("users").find({ $or: [{ nickname }, { mail }] }).toArray(function (err, result) {
            if (bcrypt.compareSync(password, result[0].password)) {
              const token = jwt.sign(
                { userId: result[0]._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' });
              JsonObj = {
                jwt: token
              };
              // res.status(200).send(JsonObj);
              res.redirect(`http://localhost:3000/authentication/login/?token=${token}`);
            }
          });
        });
      });
    } else {
      if (bcrypt.compareSync(password, result[0].password)) {
        const token = jwt.sign(
          { userId: result[0]._id },
          'RANDOM_TOKEN_SECRET',
          { expiresIn: '24h' });
        JsonObj = {
          jwt: token
        };
        // res.status(200).send(JsonObj);
        res.redirect(`http://localhost:3000/authentication/login/?token=${token}`);
      } else {
        res.status(400).end(JSON.stringify({ message: "Email already used on the site please connect without google" }));
      }
    }
  });
});


module.exports = router