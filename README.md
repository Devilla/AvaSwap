# AvaSwap

An Avalanche Exchange for ERC20 tokens.

## Buy Tokens

```result = await avaSwap.buyTokens({ from : investor, value: web3.utils.toWei('1', 'ether')}) ```

## Sell Tokens

Investor must approve the token before transaction :

```result = await Token.approve(avaSwap.address, tokens('100'), { from: investor})```

Investor sells tokens :

```result = await avaSwap.sellToken(tokens('100'), { from: investor })```

## Check Balance

Check Eth balance :

```let EthBalance = await web3.eth.getBalance(avaSwap.address)```


Check Token balance :

```let TokenBalance = await Token.balanceOf(avaSwap.address)```

## References 

1. https://github.com/makerdao/dss
2. https://github.com/smartcontractkit/LinkToken
3. https://github.com/OpenZeppelin/openzeppelin-contracts
