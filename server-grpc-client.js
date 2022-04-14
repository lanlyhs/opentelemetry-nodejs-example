"use strict";

const { ChannelCredentials } = require("@grpc/grpc-js");
const { GreeterClient } = require("npm-grpc-gen");
const { promisify } = require("util");

module.exports = {
    sayHello: async () => {
        try {
            const client = new GreeterClient(`localhost:8081`, ChannelCredentials.createInsecure());
            return promisify(client.sayHello.bind(client))({ name: "Lan" });
        } catch (error) {
            console.error(error);
        }
    }
}
