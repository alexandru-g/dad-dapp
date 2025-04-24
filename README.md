# dad-dapp

## dad-counter
Build and deploy:
```
cargo update
cargo wasm
cargo run-script optimize
injectived tx wasm store artifacts/dad_counter.wasm --from ADDRESS --gas=2000000 --gas-prices 160000000inj
injectived tx wasm instantiate CODE_ID '{"count":0}' --label DadCounter --from ADDRESS --gas=2000000 --gas-prices 160000000inj
```

## dad-dapp
Prerequisites:
1. Node - please install nvm and install LTS node (22) using nvm. Node is very finnicky.
2. Yarn

Build and run:
```
yarn dev
```