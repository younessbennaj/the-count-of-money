const mongoClient = require('mongodb').MongoClient;
// a modifier
const mongoDbUrl = 'mongodb://127.0.0.1:27017';
let mongodb;
function connect(callback){
    mongoClient.connect(mongoDbUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
        mongodb = db.db("countOfMoney")
        mongodb.createCollection("users", function (err, res) {
            if (err) throw err;
            console.log("Collection users ok");
        });
        callback();
    });
}

function get(){
    return mongodb;
}

function close(){
    mongodb.close();
}

module.exports = {
    connect,
    get,
    close
};