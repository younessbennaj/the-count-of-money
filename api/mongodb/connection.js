const mongoClient = require('mongodb').MongoClient;
// a modifier
const mongoDbUrl = 'mongodb+srv://epitech:epitech@cluster0.odrob.mongodb.net/countOfMoney?retryWrites=true&w=majority';
let mongodb;

function connect(callback){
    mongoClient.connect(mongoDbUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
        mongodb = db.db("countOfMoney")
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