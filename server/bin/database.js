let db;
require('mongodb').MongoClient.connect('mongodb://127.0.0.1:27017', { useUnifiedTopology: true }, (err, database) => {
    if (err) {
        console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
        process.exit(1);
    }
    db = database.db('musicapp');
});

module.exports = { db }