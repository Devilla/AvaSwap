// const LinkToken = artifacts.require('LinkToken')
// const AvaSwap = artifacts.require('AvaSwap')
//
//  require('chai')
//     .use(require('chai-as-promised'))
//     .should()
//
//
// contract('AvaSwap', ([deployer, investor]) => {
//   let linkToken, avaSwap
//   before(async () => {
//     linkToken = await LinkToken.deployed()
//     avaSwap = await AvaSwap.new(linkToken.address)
//   })
//
//   describe('LINK deployment', async () =>{
//     it('contract has a name', async () => {
//       const name = await linkToken.name()
//       assert.equal(name, 'ChainLink Token')
//     })
//   })
//
//   describe('AvaSwap deployment', async () =>{
//     it('contract has a name', async () => {
//       const name = await avaSwap.name()
//       // AvaSwap Link tokens transfer
//       await linkToken.transfer(avaSwap.address, '1000000000000000000000000000')
//       assert.equal(name, 'AvaSwap Network Exchange')
//     })
//
//     it('contract has LINK tokens', async () => {
//       let balance = await linkToken.balanceOf(avaSwap.address)
//       assert.equal(balance.toString(), 1000000000000000000000000000)
//     })
//   })
//
//   describe('Buy LINK Tokens', async () => {
//     let result
//
//     before( async () => {
//       result = await avaSwap.buyTokens({ from : investor, value: web3.utils.toWei('1', 'ether')})
//     })
//     it('allows user to buy tokens from AvaSwap for a fixed price', async () => {
//       // Check token balance after purchase
//       let investorBalance = await linkToken.balanceOf(investor)
//       assert.equal(investorBalance.toString(), 100000000000000000000)
//
//       // Check avaSwap balance after purchase
//       let avaSwapBalance = await linkToken.balanceOf(avaSwap.address)
//       assert.equal(avaSwapBalance.toString(), 999999900000000000000000000)
//       let ethBalance = await web3.eth.getBalance(avaSwap.address)
//       assert.equal(ethBalance, web3.utils.toWei('1', 'ether'))
//
//       // Check logs event was emitted with correct data
//       let event = result.logs[0].args
//       assert.equal(event.account, investor)
//       assert.equal(event.token, linkToken.address)
//       assert.equal(event.amount.toString(), 100000000000000000000)
//       assert.equal(event.rate.toString(), '100')
//     })
//   })
//
//  describe('Sell LINK Tokens', async () => {
//     let result
//
//     before( async () => {
//       // investor must approve the token before transaction
//       await linkToken.approve(avaSwap.address, 1000000000000000, { from: investor})
//       // investor sells tokens
//       result = await avaSwap.sellToken(1000000000000000, { from: investor })
//     })
//     it('allows user to sell tokens to AvaSwap for a fixed price', async () => {
//       // Check token balance after sell
//       let investorBalance = await linkToken.balanceOf(investor)
//       assert.equal(investorBalance.toString(), 99999000000000000000)
//
//       // Check avaSwap balance after purchase
//       let avaSwapBalance = await linkToken.balanceOf(avaSwap.address)
//       assert.equal(avaSwapBalance.toString(), '999999900001000000000000000')
//       let ethBalance = await web3.eth.getBalance(avaSwap.address)
//       assert.equal(ethBalance, '999990000000000000')
//
//     //  Check logs event was emitted with correct data
//       let event = result.logs[0].args
//       assert.equal(event.account, investor)
//       assert.equal(event.token, linkToken.address)
//       assert.equal(event.amount.toString(), 1000000000000000)
//       assert.equal(event.rate.toString(), '100')
//
//       // FAILURE: investor can't sell more tokens than they have
//       await avaSwap.sellToken(1000000000000000, { from: investor }).should.be.rejected
//     })
//   })
// })
