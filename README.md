# OpenTelemetry Nodejs Example

- [ ] Tracing
    - [x] Nodejs [cls](https://medium.com/@apechkurov/request-id-tracing-in-node-js-applications-c517c7dab62d) pass traceId
    - [ ] Service add child span
    - [x] HTTP
    - [x] Grpc
    - [x] Mongodb
    - [x] Redis
    - [x] Multi service pass traceId
- [ ] Logging
- [ ] Metrics

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
