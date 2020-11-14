pragma solidity ^0.5.0;

import './DevToken.sol';

contract EthSwap {
  string public name = "EthSwap Network Exchange";
  DevToken public Token;
  uint public rate = 100;

  event TokenPurchase(
    address account,
    address token,
    uint amount,
    uint rate
  );

  event TokenSold(
    address account,
    address token,
    uint amount,
    uint rate
  );

  constructor(DevToken _Token) public {
    Token = _Token;
  }

  function buyTokens() public payable {
    /* Calcaulate no. of tokens to buy
     Ether Amount * Redemption rate */
    uint tokenAmount = msg.value * rate;
    Token.transfer(msg.sender, tokenAmount);

    // Emit an event
    emit TokenPurchase(msg.sender, address(Token), tokenAmount, rate);
  }

  function sellToken(uint _amount) public {
    // User can't sell more tokens than they have
    require(Token.balanceOf(msg.sender) >= _amount);

    //Calculate the amount of the ether to redeem
    uint etherAmount =  _amount / rate;

    // Require that EthSwap has enough ether
    require(address(this).balance >= etherAmount);

    // Perform Sale
    Token.transferFrom(msg.sender, address(this), _amount);
    msg.sender.transfer(etherAmount);

    //Emit an event
    emit TokenSold(msg.sender, address(Token), _amount, rate);
  }
}
