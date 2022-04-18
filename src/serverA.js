"use strict";

require('dotenv').config()
require('./lib/tracing')('serverA');

const express = require("express");
const { ChannelCredentials } = require("@grpc/grpc-js");
const { GreeterClient } = require("npm-grpc-gen");
const { promisify } = require("util");
const Redis = require("ioredis");
const app = express();
const redis = new Redis();
const PORT = process.env.HTTP_PORT;
const GRPC_PORT = process.env.GRPC_PORT;

app.get("/", (req, res) => {
	res.json("Hello World");
});

app.get("/date", (req, res) => {
	res.json({ today: new Date() });
});

app.get("/grpc", async (req, res) => {
	const GRPC_CACHE_KEY = "grpc_cache";
	try {
		let resultCache = await redis.get(GRPC_CACHE_KEY);
		if (!resultCache) {
			const client = new GreeterClient(`localhost:${GRPC_PORT}`, ChannelCredentials.createInsecure());
			let result = await promisify(client.sayHello.bind(client))({ name: "Lan" });
			redis.set(GRPC_CACHE_KEY, JSON.stringify(result), "EX", 2);
		}
		resultCache = await redis.get(GRPC_CACHE_KEY);
		res.send(resultCache);
		return;
	} catch (error) {
		res.send(error);
		return;
	}
});

app.listen(parseInt(PORT, 10), () => {
	console.log(`Listening for requests on http://localhost:${PORT}`);
});
