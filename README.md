# Install

```bash
cp .env{.sample,}
./bin/docker-compose.sh run --rm install
```

# Run

```bash
./bin/docker-compose.sh up
```

 - http://localhost:8080/ React app with react redux
 - http://localhost:8080/login currently echos back request as json
 - http://localhost:8080/graphql graphql interface
