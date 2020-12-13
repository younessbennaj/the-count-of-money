const router = require('express').Router();
const db = require("../mongodb/connection");
const jwt = require('jsonwebtoken');
var ObjectId = require('mongodb').ObjectID;

const RSSFeed = require("../rssFlux/rss.js");

/// attention db RIP
setInterval(() => {
  const feed = new RSSFeed();
  db.get().collection("adminCryptos").find().toArray(async function (error, result) {
    await feed.init('https://cointelegraph.com/feed', result.map(({ id }) => (id)));
    db.get().collection("articles").find().toArray(async function (errorArticles, resultArticles) {
      console.log(resultArticles.length);
      articlesDb = resultArticles.map(({ isoDate }) => (new Date(isoDate)));
      var maxDate = new Date(Math.max(...articlesDb));
      let userData = {};
      if (resultArticles.length != 0){
        userData = feed.data.items.filter((el) => (new Date(el.isoDate)) > maxDate);
      }  else {
        userData = feed.data.items;
      }
      if (userData.length == 0) {
        return;
      }
      resultArticles = resultArticles.map(({ id, creator, title, isoDate, contentSnippet, enclosure, link, categories}) => 
      ({
        creator, title, isoDate, contentSnippet, enclosure, link, categories
      }))
      db.get().collection("articles").deleteMany();
      userData = [...resultArticles, ...userData].slice(0, 99);
      db.get().collection('articles').insertMany(userData, function (err, res) {
        if (err) throw err;
        console.log('inserted');
      });
    });
  });
}, 100000);


router.get('/', (req, res) => {
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
              let userData = resulJson.filter((el) => ( result[0].listWeb.some(ai => el.categories.includes(ai))));
              res.status(200).send(userData);
              return;
            });
          } else {
            res.status(400).end(JSON.stringify({ message: "Argument passed in must be a single String of 24 characters" }));
            return;
          }
        });
      } else {
        res.status(200).send(resulJson);
        return;
      }
    });
});

router.get('/:id', (req, res) => {
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


module.exports = router