"use strict";

require('./tracing')('serverB');

const { Server, ServerCredentials } = require("@grpc/grpc-js");
const { GreeterService, HelloReply } = require("npm-grpc-gen");
const { promisify } = require("util");

const server = new Server();

const impl = {
    sayHello(call, callback) {
        callback(null, HelloReply.fromPartial({
            message: `Hello World ${call.request.name}`,
        }));
    },
};

server.addService(GreeterService, impl);

(async function () {
    await promisify(server.bindAsync.bind(server))('localhost:8081', ServerCredentials.createInsecure())
    server.start();
})()
