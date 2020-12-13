const router = require('express').Router();
const jwt = require('jsonwebtoken');
const db = require("../mongodb/connection");
var ObjectId = require('mongodb').ObjectID;
const CoinGecko = require('coingecko-api');
const cryptocompare = require('cryptocompare');
cryptocompare.setApiKey('76f92e58e8c5bd548cc681f6707d99c5833d55072daef8c5d0ee99721b6f60b9')

const CoinGeckoClient = new CoinGecko();


router.get('/', (req, res) => {
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
  
router.post('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    if (req.headers.hasOwnProperty('jwt')) {
      jwt.verify(req.headers.jwt, 'RANDOM_TOKEN_SECRET', function (err, decoded) {
        if (err) {
          res.status(400).end(JSON.stringify({ message: "Token expired" }));
          return;
        }
        if (decoded.userId.length === 24) {
          db.get().collection("users").find({ "_id": new ObjectId(decoded.userId) }).toArray(async function (error, result) {
            if (result.length === 0) {
              res.status(400).end(JSON.stringify({ message: "User not found" }));
            }
            if (result[0].right == 1) {
              await db.get().collection("adminCryptos").deleteMany();
              await db.get().collection("adminCryptos").insertMany(req.body, function (errs, ress) {
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
  
  
router.delete('/:cmid', (req, res) => {
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
  
  
router.get('/:cmid/history/:period', async (req, res) => {
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
  
router.get('/:cmid', (req, res) => {
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

module.exports = router