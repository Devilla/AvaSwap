const AvaSwap = artifacts.require("AvaSwap");
const DevToken = artifacts.require("DevToken");
const Dai = artifacts.require('Dai');
const LinkToken = artifacts.require('LinkToken');
const PriceConsumerV3 = artifacts.require('PriceConsumerV3');



module.exports = async function(deployer) {
  // //Deploy Token
  // await deployer.deploy(DevToken);
  // const devToken = await DevToken.deployed();
  // //Deploy AvaSwap
  // await deployer.deploy(AvaSwap, devToken.address);
  // let avaSwap =  await AvaSwap.deployed();
  // // Transfer 1 million tokens to AvaSwap
  // await devToken.transfer(avaSwap.address, '1000000000000000000000000');

  // Deploy Dai
  await deployer.deploy(Dai, '5777');
  const dai = await Dai.deployed();
  //Deploy AvaSwap with Dai
  await deployer.deploy(AvaSwap, dai.address);
  avaSwap =  await AvaSwap.deployed();
  // Mint 0.001 Dai to AvaSwap
  await dai.transfer(avaSwap.address, '1000000000000000000000000');

  // Deploy PriceConsumerV3 chainlink oracle
  await deployer.deploy(PriceConsumerV3);
  // const priceConsumerV3 = await PriceConsumerV3.deployed();
  // console.log(await priceConsumerV3.getLatestPrice());

  //
  // // Deploy LINK
  // await deployer.deploy(LinkToken);
  // const Link = await LinkToken.deployed();
  // //Deploy AvaSwap with LINK
  // await deployer.deploy(AvaSwap, Link.address);
  // avaSwap =  await AvaSwap.deployed();
  // // AvaSwap Link tokens transfer
  // await Link.transfer(avaSwap.address, '1000000000000000000000000000')
};
