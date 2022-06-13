'use strict';

const process = require('process');
const opentelemetry = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');

const traceExporter = new JaegerExporter({
	endpoint: process.env.JAEGER_ENDPOINT,
});
const sdk = new opentelemetry.NodeSDK({
	resource: new Resource({
		[SemanticResourceAttributes.SERVICE_NAME]: process.env.SERVICE_NAME,
	}),
	traceExporter,
	instrumentations: [getNodeAutoInstrumentations()]
});

sdk.start()
	.then(() => console.log('Tracing initialized'))
	.catch((error) => console.log('Error initializing tracing', error));

process.on('SIGTERM', () => {
	sdk.shutdown()
		.then(() => console.log('Tracing terminated'))
		.catch((error) => console.log('Error terminating tracing', error))
		.finally(() => process.exit(0));
});
