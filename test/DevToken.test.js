//  const DevToken = artifacts.require('DevToken')
//  const EthSwap = artifacts.require('EthSwap')
//
//  require('chai')
//     .use(require('chai-as-promised'))
//     .should()
//
// function tokens(n){
//   return web3.utils.toWei(n, 'ether')
// }
//
// contract('EthSwap', ([deployer, investor]) => {
//   let devToken, ethSwap
//   before(async () => {
//     devToken = await DevToken.new()
//     ethSwap = await EthSwap.new(devToken.address)
//     // transfer of 1 million tokens to EthSwap
//     await devToken.transfer(ethSwap.address, tokens('1000000'))
//   })
//
//   describe('Dev Token deployment', async () =>{
//     it('contract has a name', async () => {
//       const name = await devToken.name()
//       assert.equal(name, 'Dev Token')
//     })
//   })
//
//   describe('EthSwap deployment', async () =>{
//     it('contract has a name', async () => {
//       const name = await ethSwap.name()
//       assert.equal(name, 'EthSwap Network Exchange')
//     })
//
//     it('contract has DEV tokens', async () => {
//       let balance = await devToken.balanceOf(ethSwap.address)
//       assert.equal(balance.toString(), tokens('1000000'))
//     })
//   })
//
//   describe('Buy Dev Tokens', async () => {
//     let result
//
//     before( async () => {
//       result = await ethSwap.buyTokens({ from : investor, value: web3.utils.toWei('1', 'ether')})
//     })
//     it('allows user to buy tokens from EthSwap for a fixed price', async () => {
//       // Check token balance after purchase
//       let investorBalance = await devToken.balanceOf(investor)
//       assert.equal(investorBalance, tokens('100'))
//
//       // Check ethSwap balance after purchase
//       let ethSwapBalance = await devToken.balanceOf(ethSwap.address)
//       assert.equal(ethSwapBalance, tokens('999900'))
//       let ethBalance = await web3.eth.getBalance(ethSwap.address)
//       assert.equal(ethBalance, web3.utils.toWei('1', 'ether'))
//
//       // Check logs event was emitted with correct data
//       let event = result.logs[0].args
//       assert.equal(event.account, investor)
//       assert.equal(event.token, devToken.address)
//       assert.equal(event.amount.toString(), tokens('100'))
//       assert.equal(event.rate.toString(), '100')
//     })
//   })
//
//  describe('Sell Dev Tokens', async () => {
//     let result
//
//     before( async () => {
//       // investor must approve the token before transaction
//       await devToken.approve(ethSwap.address, tokens('100'), { from: investor})
//       // investor sells tokens
//       result = await ethSwap.sellToken(tokens('100'), { from: investor })
//     })
//     it('allows user to sell tokens to EthSwap for a fixed price', async () => {
//       // Check token balance after sell
//       let investorBalance = await devToken.balanceOf(investor)
//       assert.equal(investorBalance, tokens('0'))
//
//       // Check ethSwap balance after purchase
//       let ethSwapBalance = await devToken.balanceOf(ethSwap.address)
//       assert.equal(ethSwapBalance, tokens('1000000'))
//       let ethBalance = await web3.eth.getBalance(ethSwap.address)
//       assert.equal(ethBalance, web3.utils.toWei('0', 'ether'))
//
//       // Check logs event was emitted with correct data
//       let event = result.logs[0].args
//       assert.equal(event.account, investor)
//       assert.equal(event.token, devToken.address)
//       assert.equal(event.amount.toString(), tokens('100'))
//       assert.equal(event.rate.toString(), '100')
//
//       // FAILURE: investor can't sell more tokens than they have
//       await ethSwap.sellToken(tokens('500'), { from: investor }).should.be.rejected
//     })
//   })
// })
