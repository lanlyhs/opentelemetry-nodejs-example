"use strict";

require('./lib/tracing')('serverB');

const { Server, ServerCredentials } = require("@grpc/grpc-js");
const { GreeterService, HelloReply } = require("npm-grpc-gen");
const { promisify } = require("util");
const mongoExampleCol = require("./lib/mongo");

const server = new Server();

const impl = {
    async sayHello(call, callback) {

        // call mongodb
        let col = await mongoExampleCol();
        let insertResult = await col.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);
        // concurrency call mongodb
        let queryResult = await Promise.all([
            col.find({}).toArray(),
            col.count({}),
        ]);

        callback(null, HelloReply.fromPartial({
            message: JSON.stringify({
                insertResult,
                queryResult,
            }),
        }));
    },
};

server.addService(GreeterService, impl);

(async function () {
    await promisify(server.bindAsync.bind(server))('localhost:8081', ServerCredentials.createInsecure())
    server.start();
})()
