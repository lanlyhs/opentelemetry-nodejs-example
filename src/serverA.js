"use strict";

require('./lib/tracing')('serverA');

const PORT = process.env.PORT || "8080";
const express = require("express");
const { ChannelCredentials } = require("@grpc/grpc-js");
const { GreeterClient } = require("npm-grpc-gen");
const { promisify } = require("util");
const Redis = require("ioredis");
const app = express();
const redis = new Redis();

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
			const client = new GreeterClient(`localhost:8081`, ChannelCredentials.createInsecure());
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
