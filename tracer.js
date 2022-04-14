'use strict';

const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { SimpleSpanProcessor, ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-base');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
const { GrpcInstrumentation } = require('@opentelemetry/instrumentation-grpc');

module.exports = (serviceName) => {
	const provider = new NodeTracerProvider({
		resource: new Resource({
			[SemanticResourceAttributes.SERVICE_NAME]: serviceName,
		}),
	});

	provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));

	provider.addSpanProcessor(new SimpleSpanProcessor(new JaegerExporter({
		endpoint: 'http://localhost:14268/api/traces',
	})));

	provider.register();

	registerInstrumentations({
		instrumentations: [
			new HttpInstrumentation(),
			new ExpressInstrumentation(),
			new GrpcInstrumentation(),
		],
	});
};
