const router = require('express').Router();
const db = require("../mongodb/connection");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var ObjectId = require('mongodb').ObjectID;


/*                                            Transforme un tableau en Object Json              */
function TabtoJson(params) {
  let JsonObj = {};
  Object.assign(JsonObj, params);
  return JsonObj;
}


/*                                            Connexion                                         */
// Connexion a l'user
router.post('/login', (req, res) => {
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
router.post('/register', (req, res) => {
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

router.post('/logout', (req, res) => {
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
router.put('/profile', (req, res) => {
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
router.get('/profile', (req, res) => {
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
router.delete('/delete', (req, res) => {
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

module.exports = router