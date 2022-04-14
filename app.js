"use strict";

require('./tracer')('app-nodejs-http');

const PORT = process.env.PORT || "8080";
const express = require("express");
const { sayHello } = require('./server-grpc-client');
const app = express();

app.get("/", (req, res) => {
	res.json("Hello World");
});

app.get("/date", (req, res) => {
	res.json({ today: new Date() });
});

app.get("/grpc", async (req, res) => {
	let result = await sayHello();
	res.send(result);
});

app.listen(parseInt(PORT, 10), () => {
	console.log(`Listening for requests on http://localhost:${PORT}`);
});
