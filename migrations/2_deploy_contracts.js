const EthSwap = artifacts.require("EthSwap");
const DevToken = artifacts.require("DevToken");
const Dai = artifacts.require('Dai');
const LinkToken = artifacts.require('LinkToken');
const PriceConsumerV3 = artifacts.require('PriceConsumerV3');



module.exports = async function(deployer) {
  // //Deploy Token
  // await deployer.deploy(DevToken);
  // const devToken = await DevToken.deployed();
  // //Deploy EthSwap
  // await deployer.deploy(EthSwap, devToken.address);
  // let ethSwap =  await EthSwap.deployed();
  // // Transfer 1 million tokens to EthSwap
  // await devToken.transfer(ethSwap.address, '1000000000000000000000000');

  // Deploy Dai
  await deployer.deploy(Dai, '5777');
  const dai = await Dai.deployed();
  //Deploy EthSwap with Dai
  await deployer.deploy(EthSwap, dai.address);
  ethSwap =  await EthSwap.deployed();
  // Mint 0.001 Dai to EthSwap
  await dai.transfer(ethSwap.address, '1000000000000000000000000');

  // Deploy PriceConsumerV3 chainlink oracle
  await deployer.deploy(PriceConsumerV3);
  // const priceConsumerV3 = await PriceConsumerV3.deployed();
  // console.log(await priceConsumerV3.getLatestPrice());

  //
  // // Deploy LINK
  // await deployer.deploy(LinkToken);
  // const Link = await LinkToken.deployed();
  // //Deploy EthSwap with LINK
  // await deployer.deploy(EthSwap, Link.address);
  // ethSwap =  await EthSwap.deployed();
  // // Ethswap Link tokens transfer
  // await Link.transfer(ethSwap.address, '1000000000000000000000000000')
};
