# OpenTelemetry Nodejs Example

- [ ] Tracing
    - [ ] Nodejs [cls](https://medium.com/@apechkurov/request-id-tracing-in-node-js-applications-c517c7dab62d) pass traceId
    - [ ] Service add child span
    - [x] HTTP
    - [x] Grpc
    - [ ] Mongodb
    - [ ] Redis
    - [x] Multi service pass traceId
- [ ] Logging
- [ ] Metrics

## Quick Start

```sh
# start serverA
node serverA.js

# start serverB
node serverB.js

# Call http api
curl http://localhost:8080/grpc

# Visit Jaeger UI http://localhost:16686/
```

## References

https://opentelemetry.io/
