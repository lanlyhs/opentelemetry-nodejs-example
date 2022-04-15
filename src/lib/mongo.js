'use strict';

const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'opentelemetry';

module.exports = async () => {
    await client.connect();
    const db = client.db(dbName);
    return db.collection('example');
}
