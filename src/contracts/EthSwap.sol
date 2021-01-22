pragma solidity 0.6.7;

import "https://github.com/smartcontractkit/chainlink/blob/master/evm-contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";
import './DevToken.sol';

contract EthSwap {
  string public name = "EthSwap Network Exchange";
  DevToken public Token;
  uint public rate;
  AggregatorV3Interface internal priceFeed;

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
    priceFeed = AggregatorV3Interface(0x22B58f1EbEDfCA50feF632bD73368b2FdA96D541);
    rate = uint256(getLatestPrice());
  }

      /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        // If the round is not complete yet, timestamp is 0
        require(timeStamp > 0, "Round not complete");
        return 1e18/price;
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
