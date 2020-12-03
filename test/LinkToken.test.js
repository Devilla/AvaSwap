const LinkToken = artifacts.require('LinkToken')
const EthSwap = artifacts.require('EthSwap')

 require('chai')
    .use(require('chai-as-promised'))
    .should()


contract('EthSwap', ([deployer, investor]) => {
  let linkToken, ethSwap
  before(async () => {
    linkToken = await LinkToken.deployed()
    ethSwap = await EthSwap.new(linkToken.address)
  })

  describe('LINK deployment', async () =>{
    it('contract has a name', async () => {
      const name = await linkToken.name()
      assert.equal(name, 'ChainLink Token')
    })
  })

  describe('EthSwap deployment', async () =>{
    it('contract has a name', async () => {
      const name = await ethSwap.name()
      // Ethswap Link tokens transfer
      await linkToken.transfer(ethSwap.address, '1000000000000000000000000000')
      assert.equal(name, 'EthSwap Network Exchange')
    })

    it('contract has LINK tokens', async () => {
      let balance = await linkToken.balanceOf(ethSwap.address)
      assert.equal(balance.toString(), 1000000000000000000000000000)
    })
  })

  describe('Buy LINK Tokens', async () => {
    let result

    before( async () => {
      result = await ethSwap.buyTokens({ from : investor, value: web3.utils.toWei('1', 'ether')})
    })
    it('allows user to buy tokens from EthSwap for a fixed price', async () => {
      // Check token balance after purchase
      let investorBalance = await linkToken.balanceOf(investor)
      assert.equal(investorBalance.toString(), 100000000000000000000)

      // Check ethSwap balance after purchase
      let ethSwapBalance = await linkToken.balanceOf(ethSwap.address)
      assert.equal(ethSwapBalance.toString(), 999999900000000000000000000)
      let ethBalance = await web3.eth.getBalance(ethSwap.address)
      assert.equal(ethBalance, web3.utils.toWei('1', 'ether'))

      // Check logs event was emitted with correct data
      let event = result.logs[0].args
      assert.equal(event.account, investor)
      assert.equal(event.token, linkToken.address)
      assert.equal(event.amount.toString(), 100000000000000000000)
      assert.equal(event.rate.toString(), '100')
    })
  })

 describe('Sell LINK Tokens', async () => {
    let result

    before( async () => {
      // investor must approve the token before transaction
      await linkToken.approve(ethSwap.address, 1000000000000000, { from: investor})
      // investor sells tokens
      result = await ethSwap.sellToken(1000000000000000, { from: investor })
    })
    it('allows user to sell tokens to EthSwap for a fixed price', async () => {
      // Check token balance after sell
      let investorBalance = await linkToken.balanceOf(investor)
      assert.equal(investorBalance.toString(), 99999000000000000000)

      // Check ethSwap balance after purchase
      let ethSwapBalance = await linkToken.balanceOf(ethSwap.address)
      assert.equal(ethSwapBalance.toString(), '999999900001000000000000000')
      let ethBalance = await web3.eth.getBalance(ethSwap.address)
      assert.equal(ethBalance, '999990000000000000')

    //  Check logs event was emitted with correct data
      let event = result.logs[0].args
      assert.equal(event.account, investor)
      assert.equal(event.token, linkToken.address)
      assert.equal(event.amount.toString(), 1000000000000000)
      assert.equal(event.rate.toString(), '100')

      // FAILURE: investor can't sell more tokens than they have
      await ethSwap.sellToken(1000000000000000, { from: investor }).should.be.rejected
    })
  })
})
