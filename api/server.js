/*                                            Import                                            */
const db = require("./mongodb/connection");
const express = require('express');
const CoinGecko = require('coingecko-api');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var bodyParser = require('body-parser')
var cors = require('cors');
var ObjectId = require('mongodb').ObjectID;
//
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const strategy = require("passport-facebook");
const FacebookStrategy = strategy.Strategy;

const RSSFeed = require("./rssFlux/rss.js");

const GOOGLE_CLIENT_ID = '10402001941-iplgmi34fo8q4eg3elq114cfklp41u65.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'R7ZqmUbsOmdKIl0VmqWqZigG';
const cryptocompare = require('cryptocompare');
// const { use } = require("passport");
var userProfile;
global.fetch = require('node-fetch');



const CoinGeckoClient = new CoinGecko();
var app = express();
app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

cryptocompare.setApiKey('76f92e58e8c5bd548cc681f6707d99c5833d55072daef8c5d0ee99721b6f60b9')


passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET'
}));

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
//

app.listen(5000, function () {
  console.log('NodeJs is running on localhost:5000 !')
})

/*                                            Transforme un tableau en Object Json              */
function TabtoJson(params) {
  let JsonObj = {};
  Object.assign(JsonObj, params);
  return JsonObj;
}

db.connect(() => {
  app.listen(process.env.PORT || 5555, function () {
    console.log('Mongo Listening :5555');
  });
});


/// attention db RIP
setInterval(() => {
  const feed = new RSSFeed();
  db.get().collection("adminCryptos").find().toArray(async function (error, result) {
    await feed.init('https://cointelegraph.com/feed', result.map(({ id }) => (id)));
    db.get().collection("articles").find().toArray(async function (errorArticles, resultArticles) {
      console.log(resultArticles.length);
      articlesDb = resultArticles.map(({ isoDate }) => (new Date(isoDate)));
      var maxDate = new Date(Math.max(...articlesDb));
      let userData = feed.data.items.filter((el) => (new Date(el.isoDate)) > maxDate)
      if (userData.length == 0) {
        return;
      }
      db.get().collection("articles").deleteMany();
      userData = [...resultArticles, ...userData].slice(0, 99);
      db.get().collection('articles').insertMany(userData, function (err, res) {
        if (err) throw err;
        console.log('inserted');
      });
    });
  });
  // }, 43200000);
}, 100000);

/*                                            Connexion                                         */
// Connexion a l'user
app.post('/users/login', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (req.body.hasOwnProperty('mail') && req.body.hasOwnProperty('password')) {
    let mail = req.body.mail;
    let nickname = req.body.mail;
    let password = req.body.password;
    let JsonObj = {};
    db.get().collection("users").find({ $or: [{ nickname }, { mail }] }).toArray(function (err, result) {
      if (result.length === 0) {
        res.status(400).end(JSON.stringify({ message: "invalid mail" }));
      } else {
        if (bcrypt.compareSync(password, result[0].password)) {
          const token = jwt.sign(
            { userId: result[0]._id },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' });
          JsonObj = {
            jwt: token
          };
          res.status(200).send(JsonObj);
        } else {
          res.status(400).end(JSON.stringify({ message: "Bad Password" }));
        }
      }
    });
  } else {
    res.status(400).end(JSON.stringify({ message: "Invalid request" }));
  }
});

// Enregistrement d'un compte
app.post('/users/register', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (req.body.hasOwnProperty('mail') && req.body.hasOwnProperty('password')) {
    let mail = req.body.mail
    let password = req.body.password
    if (password == "" || mail == "") {
      res.status(400).end(JSON.stringify({ message: "Mail or password cannot be null" }));
    }
    db.get().collection("users").find({ mail }).toArray(function (err, result) {
      if (err) throw err;
      if (Object.keys(result).length === 0) {
        bcrypt.hash(password, 10, function (err, hash) {
          req.body.nickname = mail;
          req.body.currencies = "eur";
          req.body.listCrypto = [];
          req.body.listWeb = [];
          req.body.password = hash;
          req.body.right = 0;
          db.get().collection("users").insertOne(req.body, function (err, ress) {
            if (err) throw err;
            res.status(200).end(JSON.stringify({ message: "User created" }));
          });
        });
      } else {
        res.status(400).end(JSON.stringify({ message: "mail alredy exist" }));
      }
    });
  } else {
    res.status(400).end(JSON.stringify({ message: "Invalid request" }));
  }
});

app.post('/users/logout', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (req.headers.hasOwnProperty('jwt')) {
    jwt.verify(req.headers.jwt, 'RANDOM_TOKEN_SECRET', function (err, decoded) {
      if (err) {
        res.status(400).end(JSON.stringify({ message: "Token expired" }));
        return;
      }
      if (decoded.userId.length === 24) {
        _id = decoded.userId.length
        db.get().collection("users").find({ _id }).toArray(function (error, result) {
          if (error) throw error;
          const token = jwt.sign(
            { userId: _id },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '1ms' });
          JsonObj = {
            jwt: token
          };
          res.status(200).send(JsonObj);
        });
      } else {
        res.status(400).end(JSON.stringify({ message: "Wrong JWT" }));
      }
    });
  } else {
    res.status(400).end(JSON.stringify({ message: "Invalid request" }));
  }
});

/*                                            Profile                                           */
// Update le profil de l'utilisateur
app.put('/users/profile', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (req.headers.hasOwnProperty('jwt')) {
    jwt.verify(req.headers.jwt, 'RANDOM_TOKEN_SECRET', async function (err, decoded) {
      if (err) {
        res.status(400).end(JSON.stringify({ message: "Token expired" }));
        return;
      }
      if (req.body.hasOwnProperty('password')) {
        await (async function () {
          req.body.password = await new Promise(resolve => {
            bcrypt.hash(req.body.password, 10, (err, hash) => resolve(hash));
          });
        })();
      }
      let data = req.body;
      if (decoded.userId.length === 24) {
        db.get().collection("users").updateOne({ "_id": new ObjectId(decoded.userId) }, { $set: data }, function (error, result) {
          if (error) throw error;
          res.status(200).end(JSON.stringify({ message: "Profile Updated" }));
        });
      } else {
        res.status(400).end(JSON.stringify({ message: "Wrong JWT" }));
      }
    });
  } else {
    res.status(400).end(JSON.stringify({ message: "Invalid request" }));
  }
});

// Récupère le profil de l'utilisateur
app.get('/users/profile', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (req.headers.hasOwnProperty('jwt')) {
    jwt.verify(req.headers.jwt, 'RANDOM_TOKEN_SECRET', function (err, decoded) {
      if (err) {
        res.status(400).end(JSON.stringify({ message: "Token expired" }));
        return;
      }
      if (decoded.userId.length === 24) {
        db.get().collection("users").find({ "_id": new ObjectId(decoded.userId) }).toArray(function (error, result) {
          if (error) throw error;
          const { nickname, mail, password, currencies, listCrypto, listWeb, right } = result[0]
          let newJson = { nickname, mail, password, currencies, listCrypto, listWeb, right }
          let json = JSON.stringify(TabtoJson(newJson));
          res.status(200).end(json);
        });
      } else {
        res.status(400).end(JSON.stringify({ message: "Wrong JWT" }));
      }
    });
  } else {
    res.status(400).end(JSON.stringify({ message: "Invalid request" }));
  }
});

// Supprime le profil de l'utilisateur
app.post('/users/delete', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (req.headers.hasOwnProperty('jwt') && req.body.hasOwnProperty('password')) {
    jwt.verify(req.headers.jwt, 'RANDOM_TOKEN_SECRET', function (err, decoded) {
      if (err) {
        res.status(400).end(JSON.stringify({ message: "Token expired" }));
        return;
      }
      if (decoded.userId.length === 24) {
        db.get().collection("users").find({ "_id": new ObjectId(decoded.userId) }).toArray(function (error, result) {
          if (result.length === 0) {
            res.status(400).end(JSON.stringify({ message: "User not found" }));
          }
          if (bcrypt.compareSync(req.body.password, result[0].password)) {
            db.get().collection("users").deleteOne({ "_id": new ObjectId(decoded.userId) }, function (prob, result) {
              if (prob) throw prob;
              if (result.deletedCount === 0) {
                res.status(400).end(JSON.stringify({ message: "Account not found" }));
              } else {
                let userId = decoded.userId;
                db.get().collection("objects").deleteMany({ userId }, function (warnig, result) {
                  if (warnig) throw warnig;
                  res.status(200).end(JSON.stringify({ message: "Account deleted" }));
                });
              }
            });
          } else {
            res.status(400).end(JSON.stringify({ message: "Bad password" }));
          }
        });
      } else {
        res.status(400).end(JSON.stringify({ message: "Argument passed in must be a single String of 24 characters" }));
      }
    });
  } else {
    res.status(400).end(JSON.stringify({ message: "Invalid request" }));
  }
});

app.get('/cryptos', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (req.headers.hasOwnProperty('jwt')) {
    jwt.verify(req.headers.jwt, 'RANDOM_TOKEN_SECRET', function (err, decoded) {
      if (err) {
        res.status(400).end(JSON.stringify({ message: "Token expired" }));
        return;
      }
      if (decoded.userId.length === 24) {
        db.get().collection("users").find({ "_id": new ObjectId(decoded.userId) }).toArray(async function (error, result) {
          if (error) throw error;
          db.get().collection("adminCryptos").find().toArray(async function (error1, result1) {
            if (error1) throw error1;
            let data = await CoinGeckoClient.coins.markets({ "vs_currency": result[0].currencies });
            let allowedCryptos = result1.map(({ id }) => (id));
            const userCryptos = result[0].listCrypto;
            let resulJson = data.data.map(({ id, symbol, name, current_price, high_24h, low_24h, image }) => ({
              id,
              symbol,
              name,
              current_price,
              high_24h,
              low_24h,
              image,
              allowed: allowedCryptos.includes(id),
              myCrypto: allowedCryptos.includes(id) && userCryptos.includes(id)
            }))
            if (result[0].right == 1) {
              res.status(200).send(resulJson);
            }
            if (result[0].right == 0) {
              const userData = resulJson.filter((el) => el.allowed === true)
              res.status(200).send(userData);
            }
          });
        });
      } else {
        res.status(400).end(JSON.stringify({ message: "Id error" }));
      }
    });
  } else {
    db.get().collection("adminCryptos").find().toArray(async function (error1, result1) {
      let data = await CoinGeckoClient.coins.markets({ "vs_currency": "eur" });
      let allowedCryptos = result1.map(({ id }) => (id));
      let resulJson = data.data.map(({ id, symbol, name, current_price, high_24h, low_24h, image }) => ({
        id, symbol, name, current_price, high_24h, low_24h, image, allowed: allowedCryptos.includes(id), myCrypto: false
      }))
      const userData = resulJson.filter((el) => el.allowed === true)
      res.status(200).send(userData);
    });
  }
});

app.post('/cryptos', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (req.headers.hasOwnProperty('jwt')) {
    jwt.verify(req.headers.jwt, 'RANDOM_TOKEN_SECRET', function (err, decoded) {
      if (err) {
        res.status(400).end(JSON.stringify({ message: "Token expired" }));
        return;
      }
      if (decoded.userId.length === 24) {
        db.get().collection("users").find({ "_id": new ObjectId(decoded.userId) }).toArray(function (error, result) {
          if (result.length === 0) {
            res.status(400).end(JSON.stringify({ message: "User not found" }));
          }
          if (result[0].right == 1) {
            db.get().collection("adminCryptos").deleteMany();
            db.get().collection("adminCryptos").insertMany(req.body, function (errs, ress) {
              if (errs) throw errs;
              res.status(200).end(JSON.stringify({ message: "List of crypto update" }));
            });
          } else {
            res.status(400).end(JSON.stringify({ message: "Your are not admin" }));
          }
        });
      } else {
        res.status(400).end(JSON.stringify({ message: "Argument passed in must be a single String of 24 characters" }));
      }
    });
  } else {
    res.status(400).end(JSON.stringify({ message: "Invalid request" }));
  }
});


app.delete('/cryptos/:cmid', (req, res) => {
  console.log(req.params);
  res.setHeader('Content-Type', 'application/json');
  if (req.headers.hasOwnProperty('jwt')) {
    jwt.verify(req.headers.jwt, 'RANDOM_TOKEN_SECRET', function (err, decoded) {
      if (err) {
        res.status(400).end(JSON.stringify({ message: "Token expired" }));
        return;
      }
      if (decoded.userId.length === 24) {
        db.get().collection("users").find({ "_id": new ObjectId(decoded.userId) }).toArray(function (error, result) {
          if (error) throw error;
          if (result[0].right == 1) {
            db.get().collection("adminCryptos").deleteOne({ id: req.params.cmid });
            res.status(200).end(JSON.stringify({ message: "Crypto deleted" }));
          }
        });
      } else {
        res.status(400).end(JSON.stringify({ message: "Your are not admin" }));
      }
    });
  } else {
    res.status(400).end(JSON.stringify({ message: "Invalid request" }));
  }
});


app.get('/cryptos/:cmid/history/:period', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (req.headers.hasOwnProperty('jwt')) {
    jwt.verify(req.headers.jwt, 'RANDOM_TOKEN_SECRET', async function (err, decoded) {
      if (err) {
        res.status(400).end(JSON.stringify({ message: "Token expired" }));
        return;
      }
      db.get().collection("users").find({ "_id": new ObjectId(decoded.userId) }).toArray(async function (err2, result) {
        if (err2) throw err
        switch (req.params.period) {
          case "minute":
            cryptocompare.histoMinute(req.params.cmid, result[0].currencies, { "limit": 119 })
              .then(data => {
                res.status(200).send(data);
              })
              .catch(error => {
                res.status(400).end(JSON.stringify({ message: error }));
              })
            break;
          case "hourly":
            cryptocompare.histoHour(req.params.cmid, result[0].currencies, { "limit": 47 })
              .then(data => {
                res.status(200).send(data);
              })
              .catch(error => {
                res.status(400).end(JSON.stringify({ message: error }));
              })
            break;
          case "daily":
            cryptocompare.histoDay(req.params.cmid, result[0].currencies, { "limit": 59 })
              .then(data => {
                res.status(200).send(data);
              })
              .catch(error => {
                res.status(400).end(JSON.stringify({ message: error }));
              })
            break;
          default:
            res.status(400).end(JSON.stringify({ message: "period not valid" }));
            break;
        }
      });
    });
  } else {
    res.status(400).end(JSON.stringify({ message: "Invalid request" }));
  }
});

app.get('/cryptos/:cmid', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (req.headers.hasOwnProperty('jwt')) {
    jwt.verify(req.headers.jwt, 'RANDOM_TOKEN_SECRET', function (err, decoded) {
      if (err) {
        res.status(400).end(JSON.stringify({ message: "Token expired" }));
        return;
      }
      if (decoded.userId.length === 24) {
        db.get().collection("users").find({ "_id": new ObjectId(decoded.userId) }).toArray(async function (error, result) {
          let data = await CoinGeckoClient.coins.fetch(req.params.cmid, { "tickers": false, "market_data": false, "community_data": false, "developer_data": false, "localization": false, "sparkline": false });
          res.status(200).send(data.data);
        });
      } else {
        res.status(400).end(JSON.stringify({ message: "Argument passed in must be a single String of 24 characters" }));
      }
    });
  } else {
    res.status(400).end(JSON.stringify({ message: "Invalid request" }));
  }
});

app.get('/users/auth/:provider', function (req, res) {
  if (req.params.provider === "google") {
    passport.authenticate("google", { scope: ['profile', 'email'] })(req, res);
  } else if (req.params.provider === "facebook") {
    passport.authenticate("facebook", { scope: ['email'] })(req, res);
  } else {
    res.status(400).end(JSON.stringify({ message: "Provider not define" }));
  }
});

app.get("/users/auth/:provider/callback", ownMiddleware, (req, res, next) => {
  passport.authenticate(global.provider, { scope: ['email'] })(req, res, next);
}, (req, res) => {
  let mail = res.req.user.emails[0].value;
  console.log(mail)
  let nickname = res.req.user.displayName;
  let password = res.req.user.id;
  let JsonObj = {};
  db.get().collection("users").find({ $or: [{ nickname }, { mail }] }).toArray(function (err, result) {
    console.log();
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
              res.status(200).send(JsonObj);
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
        res.status(200).send(JsonObj);
      } else {
        res.status(400).end(JSON.stringify({ message: "Email already used on the site please connect without google" }));
      }
    }
  });
});

app.get('/articles', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  db.get().collection("articles").find().toArray(async function (errorArticles, resultArticles) {
    if (errorArticles) throw errorArticles;
    let resulJson = await resultArticles.map(({ _id, title, enclosure, link, categories }) => ({
      _id,
      title,
      enclosure,
      link,
      categories,
    }));
    if (req.headers.hasOwnProperty('jwt')) {
      jwt.verify(req.headers.jwt, 'RANDOM_TOKEN_SECRET', function (err, decoded) {
        if (err) {
          res.status(400).end(JSON.stringify({ message: "Token expired" }));
          return;
        }
        if (decoded.userId.length === 24) {
          db.get().collection("users").find({ "_id": new ObjectId(decoded.userId) }).toArray(async function (error, result) {
            if (result[0].listWeb.length == 0) {
              res.status(200).send(resulJson);
              return;
            }
            let userData = resulJson.filter((el) => (result[0].listWeb.some(ai => el.categories.includes(ai))));
            res.status(200).send(userData);
            return;
          });
        } else {
          res.status(400).end(JSON.stringify({ message: "Argument passed in must be a single String of 24 characters" }));
        }
      });
    }
    res.status(200).send(resulJson);
  });
});

app.get('/articles/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  db.get().collection("articles").find({ "_id": new ObjectId(req.params.id) }).toArray(async function (errorArticles, resultArticles) {
    if (errorArticles) {
      res.status(400).end(JSON.stringify({ message: "Article no exist" }));
      return;
    } else {
      res.status(200).send(resultArticles[0]);
    }
  });
});
