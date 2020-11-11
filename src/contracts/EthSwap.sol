pragma solidity ^0.5.0;

import './DevToken.sol';

contract EthSwap {
  string public name = "EthSwap Network Exchange";
  DevToken public devToken;
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

  constructor(DevToken _devToken) public {
    devToken = _devToken;
  }

  function buyTokens() public payable {
    /* Calcaulate no. of tokens to buy
     Ether Amount * Redemption rate */
    uint tokenAmount = msg.value * rate;
    devToken.transfer(msg.sender, tokenAmount);

    // Emit an event
    emit TokenPurchase(msg.sender, address(devToken), tokenAmount, rate);
  }

  function sellToken(uint _amount) public {
    // User can't sell more tokens than they have
    require(devToken.balanceOf(msg.sender) >= _amount);

    //Calculate the amount of the ether to redeem
    uint etherAmount =  _amount / rate;

    // Require that EthSwap has enough ether
    require(address(this).balance >= etherAmount);

    // Perform Sale
    devToken.transferFrom(msg.sender, address(this), _amount);
    msg.sender.transfer(etherAmount);

    //Emit an event
    emit TokenSold(msg.sender, address(devToken), _amount, rate);
  }
}
