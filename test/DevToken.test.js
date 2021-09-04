//  const DevToken = artifacts.require('DevToken')
//  const AvaSwap = artifacts.require('AvaSwap')
//
//  require('chai')
//     .use(require('chai-as-promised'))
//     .should()
//
// function tokens(n){
//   return web3.utils.toWei(n, 'ether')
// }
//
// contract('AvaSwap', ([deployer, investor]) => {
//   let devToken, avaSwap
//   before(async () => {
//     devToken = await DevToken.new()
//     avaSwap = await AvaSwap.new(devToken.address)
//     // transfer of 1 million tokens to AvaSwap
//     await devToken.transfer(avaSwap.address, tokens('1000000'))
//   })
//
//   describe('Dev Token deployment', async () =>{
//     it('contract has a name', async () => {
//       const name = await devToken.name()
//       assert.equal(name, 'Dev Token')
//     })
//   })
//
//   describe('AvaSwap deployment', async () =>{
//     it('contract has a name', async () => {
//       const name = await avaSwap.name()
//       assert.equal(name, 'AvaSwap Network Exchange')
//     })
//
//     it('contract has DEV tokens', async () => {
//       let balance = await devToken.balanceOf(avaSwap.address)
//       assert.equal(balance.toString(), tokens('1000000'))
//     })
//   })
//
//   describe('Buy Dev Tokens', async () => {
//     let result
//
//     before( async () => {
//       result = await avaSwap.buyTokens({ from : investor, value: web3.utils.toWei('1', 'ether')})
//     })
//     it('allows user to buy tokens from AvaSwap for a fixed price', async () => {
//       // Check token balance after purchase
//       let investorBalance = await devToken.balanceOf(investor)
//       assert.equal(investorBalance, tokens('100'))
//
//       // Check avaSwap balance after purchase
//       let avaSwapBalance = await devToken.balanceOf(avaSwap.address)
//       assert.equal(avaSwapBalance, tokens('999900'))
//       let ethBalance = await web3.eth.getBalance(avaSwap.address)
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
//       await devToken.approve(avaSwap.address, tokens('100'), { from: investor})
//       // investor sells tokens
//       result = await avaSwap.sellToken(tokens('100'), { from: investor })
//     })
//     it('allows user to sell tokens to AvaSwap for a fixed price', async () => {
//       // Check token balance after sell
//       let investorBalance = await devToken.balanceOf(investor)
//       assert.equal(investorBalance, tokens('0'))
//
//       // Check avaSwap balance after purchase
//       let avaSwapBalance = await devToken.balanceOf(avaSwap.address)
//       assert.equal(avaSwapBalance, tokens('1000000'))
//       let ethBalance = await web3.eth.getBalance(avaSwap.address)
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
//       await avaSwap.sellToken(tokens('500'), { from: investor }).should.be.rejected
//     })
//   })
// })
