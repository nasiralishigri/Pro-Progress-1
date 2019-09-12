var Migrations = artifacts.require("./Trabic.sol");
var CrowdSale = artifacts.require("./trabicCrowdSale.sol");
var price_connect =require('../test/coinbaseApi/price.js');
var ether = require('./../test/helpers/ethers.js');

const RefundVault = artifacts.require('../node_modules/openzeppelin-solidity/contracts/crowdsale/distribution/utils/RefundVault.sol');

module.exports =async function(deployer,accounts) {
  await deployer.deploy(Migrations,'Trabic','TRC',18);
  const trabicToken = await Migrations.deployed();

       

  const wei=100000000000000;
  const _cap=100000000 ;
  // const minCap = 2000000000000000;
  // var hardCap = 50000000000000000000;

 
  var _rate=  100000000000000;
  var checkAccount =await web3.eth.getAccounts();
  var trabiAddress = trabicToken.address;
  console.log("Trabic Token address is : "+ trabiAddress);
  // console.log("Checking account in migration is :"+ checkAccount[0]);
  
  // var _wallet=accounts[1];
  // console.log("Wallet address in Migration is : "+ _wallet);

  var openinigTime =  1566299617105;
  var closingTime =   15662999999999;
  var _goal = 100000;

var crowdSale = await deployer.deploy(CrowdSale,_rate,checkAccount[1], trabiAddress,_cap,openinigTime, closingTime , _goal);

   await CrowdSale.deployed();
   var crowdSaleAddress = crowdSale.address;
  await deployer.deploy(RefundVault,crowdSaleAddress);


};