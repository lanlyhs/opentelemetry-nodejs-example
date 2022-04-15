"use strict";

require('./lib/tracing')('serverA');

const PORT = process.env.PORT || "8080";
const express = require("express");
const { ChannelCredentials } = require("@grpc/grpc-js");
const { GreeterClient } = require("npm-grpc-gen");
const { promisify } = require("util");
const app = express();

app.get("/", (req, res) => {
	res.json("Hello World");
});

app.get("/date", (req, res) => {
	res.json({ today: new Date() });
});

app.get("/grpc", async (req, res) => {
	try {
		const client = new GreeterClient(`localhost:8081`, ChannelCredentials.createInsecure());
		let result = promisify(client.sayHello.bind(client))({ name: "Lan" });
		res.send(result);
		return;
	} catch (error) {
		res.send(error);
		return;
	}
});

app.listen(parseInt(PORT, 10), () => {
	console.log(`Listening for requests on http://localhost:${PORT}`);
});
