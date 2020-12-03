# EthSwap

An Ethereum Exchange for ERC20 tokens.

## Kovan EthSwap Contract Creation

https://kovan.etherscan.io/address/0xECEa9e401a648F08ff7680996Bd2ebe2Cc5112Bd

## Kovan ChainLink Token

https://kovan.etherscan.io/address/0x235426ce11a3E23EA30f77cf6Dcbc7Fcd31E5a60


## Kovan Dai Stablecoin

https://kovan.etherscan.io/address/0x43b23072b895a342e464c4116d4fb8d3aaf53c78

## Kovan Dev Token

https://kovan.etherscan.io/address/0x68b04a6ce5083de24a6b6c9362dd38bd9f8a85ca


## Migrations

```
Starting migrations...
======================
> Network name:    'kovan'
> Network id:      42
> Block gas limit: 12500000 (0xbebc20)


1_initial_migration.js
======================

   Replacing 'Migrations'
   ----------------------
   > transaction hash:    0xcb4315ceadba49185296c979b958eedbf522e8415f607e6b7f6d825d9d88d011
   > Blocks: 1            Seconds: 6
   > contract address:    0x17b8e7285B1523C1D931Bb38310A2a5C30d942bD
   > block number:        22407962
   > block timestamp:     1607010920
   > account:             0xA0b9F620f858Fa4f46c2777843E5dEf8e88d56aF
   > balance:             1.24874856229665
   > gas used:            225441 (0x370a1)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.005636025 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.005636025 ETH


2_deploy_contracts.js
=====================

   Deploying 'LinkToken'
   ---------------------

> transaction hash:    0xe0de086fe2509877f5678cfbd07d5f694ae21f1b65778f02d3ac98a8aa9dff6a
> Blocks: 9            Seconds: 127
> contract address:    0x235426ce11a3E23EA30f77cf6Dcbc7Fcd31E5a60
> block number:        22407990
> block timestamp:     1607011064
> account:             0xA0b9F620f858Fa4f46c2777843E5dEf8e88d56aF
> balance:             1.21199671229665
> gas used:            1427711 (0x15c8ff)
> gas price:           25 gwei
> value sent:          0 ETH
> total cost:          0.035692775 ETH


Replacing 'EthSwap'
-------------------
> transaction hash:    0xeb94b32c0445e3c33bd4d8b76df535e6091d24682d00ae7cf691d73f875d0473
> Blocks: 1            Seconds: 11
> contract address:    0xECEa9e401a648F08ff7680996Bd2ebe2Cc5112Bd
> block number:        22408007
> block timestamp:     1607011160
> account:             0xA0b9F620f858Fa4f46c2777843E5dEf8e88d56aF
> balance:             1.19848681229665
> gas used:            540396 (0x83eec)
> gas price:           25 gwei
> value sent:          0 ETH
> total cost:          0.0135099 ETH


> Saving migration to chain.
> Saving artifacts
-------------------------------------
> Total cost:         0.049202675 ETH


Summary
=======
> Total deployments:   3
> Final cost:          0.0548387 ETH

```

## Buy Tokens

```result = await ethSwap.buyTokens({ from : investor, value: web3.utils.toWei('1', 'ether')}) ```

## Sell Tokens

Investor must approve the token before transaction :

```result = await Token.approve(ethSwap.address, tokens('100'), { from: investor})```

Investor sells tokens :

```result = await ethSwap.sellToken(tokens('100'), { from: investor })```

## Check Balance

Check Eth balance :

```let EthBalance = await web3.eth.getBalance(ethSwap.address)```


Check Token balance :

```let TokenBalance = await Token.balanceOf(ethSwap.address)```
