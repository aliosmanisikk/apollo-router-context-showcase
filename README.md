## Install rover

```
npm install -g @apollo/rover
```

## Run with Apollo Keys to make use of enterprise features

Rename .env.example to .env and fill in APOLLO_KEY . It must be service key. You can use IOWL one.

```
yarn install
source .env && yarn start
```

## Run with no keys

```
source .env.none && yarn start
```

## Use

- Go to https://studio.apollographql.com/sandbox/explorer
- Configure http://localhost:4000 as schema endpoint
- Enable `Request query plans from router` in settings to be able to see query plans
