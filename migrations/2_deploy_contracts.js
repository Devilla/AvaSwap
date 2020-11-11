const EthSwap = artifacts.require("EthSwap");
const DevToken = artifacts.require("DevToken");

module.exports = async function(deployer) {
  //Deploy Token
  await deployer.deploy(DevToken);
  const devToken = await DevToken.deployed();

  //Deploy EthSwap
  await deployer.deploy(EthSwap, devToken.address);
  const ethSwap =  await EthSwap.deployed();

  // Transfer 1 million tokens to EthSwap
  await devToken.transfer(ethSwap.address, '1000000000000000000000000');
};
