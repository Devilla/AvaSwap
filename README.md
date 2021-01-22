# EthSwap

An Ethereum Exchange for ERC20 tokens.

## Kovan EthSwap Contract Creation

https://kovan.etherscan.io/address/0x2471B119C722a4b214F62a1945d2358462B72c2a

## Kovan ChainLink Token

https://kovan.etherscan.io/address/0x235426ce11a3E23EA30f77cf6Dcbc7Fcd31E5a60


## Kovan Dai Stablecoin

https://kovan.etherscan.io/address/0x7858355eBC5708ce10494875BC065bD32a88ac0d

## Kovan Dev Token

https://kovan.etherscan.io/address/0x68b04a6ce5083de24a6b6c9362dd38bd9f8a85ca


## Migrations

```
Starting migrations...
======================
> Network name:    'kovan'
> Network id:      42
> Block gas limit: 12500000 (0xbebc20)



   Replacing 'Dai'
   ---------------
   > transaction hash:    0xa36081ea8d3ff41ed787ea3a4fd972a631ff886c2ecd7698ffa681a1780c545c
   > Blocks: 1            Seconds: 5
   > contract address:    0x7858355eBC5708ce10494875BC065bD32a88ac0d
   > block number:        22453390
   > block timestamp:     1607249812
   > account:             0xA0b9F620f858Fa4f46c2777843E5dEf8e88d56aF
   > balance:             12.50392818857165
   > gas used:            1844244 (0x1c2414)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.0461061 ETH


   Replacing 'EthSwap'
   -------------------
   > transaction hash:    0x9ae2f30a9890c0f34cbe9d6cabbfd3c59b93702954b5c12cc43c33bbc35b4895
   > Blocks: 1            Seconds: 5
   > contract address:    0x81977DdCc672a4795BD7Eea7B0bb03A4787e2372
   > block number:        22453393
   > block timestamp:     1607249828
   > account:             0xA0b9F620f858Fa4f46c2777843E5dEf8e88d56aF
   > balance:             12.49041828857165
   > gas used:            540396 (0x83eec)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.0135099 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:            0.059616 ETH


Summary
=======
> Total deployments:   3
> Final cost:          0.065252025 ETH

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

## References 

1. https://github.com/makerdao/dss
2. https://github.com/smartcontractkit/LinkToken
3. https://github.com/OpenZeppelin/openzeppelin-contracts
