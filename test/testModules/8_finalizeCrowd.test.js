const { balance, expectEvent } = require('openzeppelin-test-helpers');
var ether = require('../helpers/ethers.js');

var { AssertionError } = require('assert');
const BigNumber = web3.BigNumber;
var EVMRevert = require('../helpers/EVMRevert');
var { increaseTimeTo, duration } = require ('../helpers/increaseTime');
var latestTime = require("../helpers/latestTime");
const Trabic  = artifacts.require('Trabic')
const trabicSale = artifacts.require('trabicCrowdSale')
const Web3 = require('web3')

 require('chai')
.use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();
  // refund Vault
  const RefundEscrow = artifacts.require('./RefundEscrow');
// console.log(latestTime.latestTime)
contract('this is the trabic Crowdsale ',function([_,wallet,invester1,invester2],value,rate){
    //const expectedTokenAmount = rate.mul(value);
    beforeEach(async function(){
        this.name='Trabic';
        this.symbol='TRC';
        this.decimals=18;
        this.trabicToken=await Trabic.new(this.name,this.symbol,this.decimals);
        // const wei=1000000000000000000;
        this.cap=  ether(100); //10*wei;
        this.rate=500;
        this.goal = ether(50);
        
        var latestTimes = await latestTime()
        // console.log("Latest TimeStamp of Block is:  "+latestTime );
       

        this.openingTime = latestTimes + duration.seconds(1);//2589000
         this.closingTime = this.openingTime + duration.seconds(8);
        // console.log("Closing Time is :"+this.closingTime );
     // Token Distribution
          this.tokenSalePercentage  = 70;
          this.foundersPercentage   = 10;
          this.foundationPercentage = 10;
          this.partnersPercentage   = 10;

        this.investorMinCap = ether(0.002);
        this.investorHardCap = ether(50);
            // ICO Stages
            this.preIcoStage = 0;
            this.preIcoRate = 500;
            this.icoStage = 1;
            this.icoRate = 250;

        this.wallet=wallet; 
        this.trabicCrowdSale=await trabicSale.new(500,this.wallet,this.trabicToken.address,this.cap.toString(), this.openingTime, this.closingTime, this.goal);
      
         // Transfer token ownership to crowdsale address
         await this.trabicToken.transferOwnership(this.trabicCrowdSale.address)

         await this.trabicToken.addMinter(this.trabicCrowdSale.address)


         // Add investors to whitelist
    await this.trabicCrowdSale.addWhitelisted(invester1);
    await this.trabicCrowdSale.addWhitelisted(invester2);
    // await this.trabicCrowdSale.addWhitelisted(invester2);
    await wait(2000);

    // Track refund vault
    this.vaultAddress = await this.trabicCrowdSale.wallet();
    this.vault = await new RefundEscrow(this.vaultAddress);
   
      // this.vault =  refundEsc.at(this.vaultAddress);
     // Advance time to crowdsale start
     await increaseTimeTo(this.openingTime + 1)


    });
  
    async function wait(ms) {
      return new Promise(resolve => {
        setTimeout(resolve, ms);
      });
    }

    


  /// Finalized CrowdSale   
  
  describe("First Buy Token and then ", function(){

    it('it buy tokens ', async function(){
        await wait(2000);
        // Do not meet the toal
        await this.trabicCrowdSale.buyTokens(invester1, { value: ether(1), from: invester1 });
        // await increaseTimeTo(this.closingTime + 1);
        
    })

  })

    //       When Goal is not Reached   //
     describe('when the goal is not reached', function() {

       
      beforeEach(async function () {
        await wait(1000);
        // Do not meet the toal
        await this.trabicCrowdSale.buyTokens(invester2, { value: ether(1), from: invester2 });
        // Fastforward past end time
        // Finalize the crowdsale
        await wait(8000);
        await this.trabicCrowdSale.finalize({ from: _ });
        
      });

      it('allows the investor to claim refund', async function () {
        //   await wait(2000);
        await this.trabicCrowdSale.claimRefund(invester2).should.be.fulfilled;
      });
    });
          
    describe('when goal is reached', function(){

    beforeEach(async function(){

 // track current wallet balance
 this.walletBalance = await web3.eth.getBalance(wallet);

 // Meet the goal
 await this.trabicCrowdSale.buyTokens(invester1, { value: ether(26), from: invester1 });
 await this.trabicCrowdSale.buyTokens(invester2, { value: ether(26), from: invester2 });
 // Fastforward past end time
 await increaseTimeTo(this.closingTime + duration.seconds(10));
 // Finalize the crowdsale
 await wait(10000);
 await this.trabicCrowdSale.finalize({ from: _ });


    })



    it('it shows finish minting role ', async function(){

// Finish Minting Token  

    })

it('Handle goal reached ', async function(){

   // Track Goal Reached 

   const goalReached = await this.trabicCrowdSale.goalReached();
   goalReached.should.be.true;

//  Prevent Investor from Claiming refund
await this.trabicCrowdSale.claimRefund(invester1).should.be.rejectedWith(EVMRevert);  


})


    })


})

    



///////    ******   Finalize Crowd Sale     ****** Successfull   ///////
/////    Test Case Module   10   /////
////   When goal is not reached but finalized the time duration then investor claim for refund
//////     if goal is reached than Revert user to claim refund    ///

