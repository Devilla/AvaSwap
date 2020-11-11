# EthSwap

An Ethereum Exchange for different ERC20 tokens.

## Migrations

```
Migrations dry-run (simulation)
===============================
> Network name:    'kovan-fork'
> Network id:      42
> Block gas limit: 12500000 (0xbebc20)

   Deploying 'DevToken'
   --------------------
   > transaction hash:    0xaecdd1f21367b6274f443ae4deb16d61fb2b852b87db77354798f5a8b928f67e
   > Blocks: 2            Seconds: 10
   > contract address:    0x68B04a6Ce5083DE24a6B6c9362DD38bd9F8A85cA
   > block number:        22036109
   > block timestamp:     1605091188
   > account:             0xA0b9F620f858Fa4f46c2777843E5dEf8e88d56aF
   > balance:             3.9747257
   > gas used:            743372 (0xb57cc)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.0185843 ETH


   Deploying 'EthSwap'
   -------------------
   > transaction hash:    0xde2f02686725a14ca9e183e717f8f25cce231a73c6446fd3bd44ba45f01002b4
   > Blocks: 2            Seconds: 6
   > contract address:    0x7B9237158d64009838f1789ca05EC2683D023d30
   > block number:        22036114
   > block timestamp:     1605091208
   > account:             0xA0b9F620f858Fa4f46c2777843E5dEf8e88d56aF
   > balance:             3.9612215
   > gas used:            540168 (0x83e08)
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.0135042 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:           0.0320885 ETH


Summary
=======
> Total deployments:   3
> Final cost:          0.037719425 ETH
```

## Buy Tokens

```result = await ethSwap.buyTokens({ from : investor, value: web3.utils.toWei('1', 'ether')}) ```

## Sell Tokens

Investor must approve the token before transaction :

```result = await devToken.approve(ethSwap.address, tokens('100'), { from: investor})```

Investor sells tokens : 

```result = await ethSwap.sellToken(tokens('100'), { from: investor })```

Check Eth balance :

```let EthBalance = await web3.eth.getBalance(ethSwap.address)```


Check Token balance :

```let TokenBalance = await Token.balanceOf(ethSwap.address)```


