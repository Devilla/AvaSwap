require('babel-register');
require('babel-polyfill');
const HDWalletProvider = require('truffle-hdwallet-provider');
const { infuraKey, mnemonic } = require('./.secret');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    kovan: {
     provider: () => new HDWalletProvider(mnemonic, infuraKey),
     gas: 5000000,
     gasPrice: 25000000000,
     network_id: 42,
     networkCheckTimeout: 600000000
   }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
     version: "<=0.6.7",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
