//require('babel-register')();
 //require('babel-polyfill');
const Trabic  = artifacts.require('Trabic')
const BigNumber = web3.BigNumber;
require('chai')
  .use(require('chai-bignumber')(BigNumber))
  .should();


//require('chai').use(require('chai-bignumber')(BigNumber)).should();
let token;

contract('this is the trabic token test',accounts=>{
    const creater =accounts[0];
    const _name='Trabic';
    const _symbol='TRC';
    const _decimal=18;
    beforeEach(async function(){
       
        token = await Trabic.new(_name,_symbol,_decimal);
    })

    it('name is correct',async function(){ // Check Name is Correct or Not or Not
        token=await Trabic.deployed();
        const testName=await token.name();
        assert.equal(testName,_name,'the is not correct')   
     })
     it('the symbole of token is correct',async function(){
        token=await Trabic.deployed();
        const tokenSymbol=await token.symbol();
         
         assert.equal(tokenSymbol,_symbol,'this token is  symbol is ')
     })
     it('this should dedcribe about the decimels value',async function(){
        token=await Trabic.deployed(); 
        const decimelsOrder=await token.decimals();
        assert.equal(decimelsOrder,_decimal,'this is not equal ')
         
     })
     it('this should desctibe the total supply of token', async function(){

      token =  await Trabic.deployed();
      const totalSupply = await token.totalSupply();
      console.log("Total Supply is : "+ totalSupply);
     })
    //  it('this is ')
})