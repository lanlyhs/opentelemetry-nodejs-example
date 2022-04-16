# OpenTelemetry Nodejs Example

- [x] [Tracing](https://opentelemetry.io/docs/reference/specification/trace/api/)
    - [x] Nodejs [cls](https://medium.com/@apechkurov/request-id-tracing-in-node-js-applications-c517c7dab62d) pass traceId
    - [x] HTTP
    - [x] Grpc
    - [x] Mongodb
    - [x] Redis
    - [x] Multi service pass traceId
- ~~Logging~~
  - [WIP](https://opentelemetry.io/docs/reference/specification/logs/overview/)
- ~~Metrics~~
  - [WIP](https://opentelemetry.io/docs/reference/specification/metrics/)

## Quick Start

```sh
# run instrumentations jaeger mongodb redis
docker-compose up

# start serverA and serverB
npm run start

# Call http api
curl http://localhost:8080/grpc

# Visit tracing in Jaeger UI http://localhost:16686/
```

## References

https://opentelemetry.io/
