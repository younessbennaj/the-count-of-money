/*                                            Import                                            */
const db = require("./mongodb/connection");
const express = require('express');
const CoinGecko = require('coingecko-api');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var bodyParser = require('body-parser')
var cors = require('cors');
var ObjectId = require('mongodb').ObjectID;

const CoinGeckoClient = new CoinGecko();
var app = express();
app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));


var checkCoinGecko = async () => {
  let data = await CoinGeckoClient.ping()
  return (data.code)
}

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
    jwt.verify(req.headers.jwt, 'RANDOM_TOKEN_SECRET', function (err, decoded) {
      if (err) {
        res.status(400).end(JSON.stringify({ message: "Token expired" }));
      }
      let password = req.body.password;
      bcrypt.hash(password, 10, function (err, hash) {
        req.body.password = hash;
        let data = req.body;
        // password = hash;
        //   const {nickname, mail, password, currencies, listCrypto, listWeb} = req.body
        if (decoded.userId.length === 24) {
          db.get().collection("users").updateOne({ "_id": new ObjectId(decoded.userId) }, { $set: data }, function (error, result) {
            if (error) throw error;
            res.status(200).end(JSON.stringify({ message: "Profile Updated" }));
          });
        } else {
          res.status(400).end(JSON.stringify({ message: "Wrong JWT" }));
        }
      });
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
      }
      if (decoded.userId.length === 24) {
        db.get().collection("users").find({ "_id": new ObjectId(decoded.userId) }).toArray(async function (error, result) {
          if (error) throw error;
          db.get().collection("adminCryptos").find().toArray(async function (error1, result1) {
            if (error1) throw error1;
            let data = await CoinGeckoClient.coins.markets({ "vs_currency": result[0].currencies });
            let allowedCryptos = result1.map(({ id }) => (id));
            const userCryptos = result[0].listCrypto;
            let resulJson = data.data.map(({ id, name, current_price, high_24h, low_24h, image }) => ({
              id,
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
      let resulJson = data.data.map(({ id, name, current_price, high_24h, low_24h, image }) => ({
        id, name, current_price, high_24h, low_24h, image, allowed: allowedCryptos.includes(id), myCrypto: false
      }))
      res.status(200).send(resulJson);
    });
  }
});

app.post('/cryptos', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (req.headers.hasOwnProperty('jwt')) {
    jwt.verify(req.headers.jwt, 'RANDOM_TOKEN_SECRET', function (err, decoded) {
      if (err) {
        res.status(400).end(JSON.stringify({ message: "Token expired" }));
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
      }
      if (decoded.userId.length === 24) {
        db.get().collection("users").find({ "_id": new ObjectId(decoded.userId) }).toArray(function (error, result) {
          if (error) throw error;
          if (result[0].right == 1) {
            db.get().collection("adminCryptos").deleteOne({id :req.params.cmid});
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

app.get('/cryptos', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (req.headers.hasOwnProperty('jwt') && req.body.hasOwnProperty('id')) {
    jwt.verify(req.headers.jwt, 'RANDOM_TOKEN_SECRET', function (err, decoded) {
      if (err) {
        res.status(400).end(JSON.stringify({ message: "Token expired" }));
      }
      if (decoded.userId.length === 24) {
        db.get().collection("users").find({ "_id": new ObjectId(decoded.userId) }).toArray(async function (error, result) {
          if (error) throw error;
          if (result[0].right == 1) {
            db.get().collection("adminCryptos").deleteOne({id :req.body.id});
            res.status(200).end(JSON.stringify({ message: "Crypto as been deleted" }));
          } else {
            res.status(400).end(JSON.stringify({ message: "Argument passed in must be a single String of 24 characters" }));
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

app.get('/cryptos/:cmid/history/:period', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (req.headers.hasOwnProperty('jwt')) {
    jwt.verify(req.headers.jwt, 'RANDOM_TOKEN_SECRET', function (err, decoded) {
      if (err) {
        res.status(400).end(JSON.stringify({ message: "Token expired" }));
      }
      if (decoded.userId.length === 24) {
        db.get().collection("users").find({ "_id": new ObjectId(decoded.userId) }).toArray(async function (error, result) {
        if (req.params.period == "daily") {
          let data = await CoinGeckoClient.coins.fetchMarketChart(req.params.cmid, {"coinId": req.params.cmid, "vs_currency": result[0].currencies, "days": "60", "interval": "daily"});
          res.status(200).send(data.data);
        }
        if (req.params.period == "hourly") {
          let data = await CoinGeckoClient.coins.fetchMarketChart(req.params.cmid, {"coinId": req.params.cmid, "vs_currency": result[0].currencies, "days": "2", "interval": "hourly"});
          res.status(200).send(data.data);
        }
        if (req.params.period == "minute") {
          let data = await CoinGeckoClient.coins.fetchMarketChart(req.params.cmid, {"coinId": req.params.cmid, "vs_currency": result[0].currencies, "days": "60", "interval": "minutely"});
          let newJson = {prices: data.data.prices.slice(0, 120), market_caps: data.data.market_caps.slice(0, 120), total_volumes: data.data.total_volumes.slice(0, 120)};
          res.status(200).send(newJson);
        } else {
          res.status(400).end(JSON.stringify({ message: "Period error" }));
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

app.get('/cryptos/:cmid', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (req.headers.hasOwnProperty('jwt')) {
    jwt.verify(req.headers.jwt, 'RANDOM_TOKEN_SECRET', function (err, decoded) {
      if (err) {
        res.status(400).end(JSON.stringify({ message: "Token expired" }));
      }
      if (decoded.userId.length === 24) {
        db.get().collection("users").find({ "_id": new ObjectId(decoded.userId) }).toArray(async function (error, result) {
          let data = await CoinGeckoClient.coins.fetch(req.params.cmid, {"tickers": false, "market_data": false, "community_data": false, "developer_data":false, "localization":false, "sparkline":false});
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