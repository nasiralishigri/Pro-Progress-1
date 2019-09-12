pragma solidity ^0.4.24;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Pausable.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";
import "../node_modules/openzeppelin-solidity/contracts/crowdsale/Crowdsale.sol";
import "../node_modules/openzeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "../node_modules/openzeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "../node_modules/openzeppelin-solidity/contracts/crowdsale/validation/TimedCrowdsale.sol";
import "../node_modules/openzeppelin-solidity/contracts/crowdsale/validation/WhitelistCrowdsale.sol";
import "../node_modules/openzeppelin-solidity/contracts/crowdsale/distribution/RefundableCrowdsale.sol";
import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract trabicCrowdSale is Crowdsale,MintedCrowdsale ,CappedCrowdsale , Ownable ,TimedCrowdsale , WhitelistCrowdsale , RefundableCrowdsale {
   

  // ICO Stages
 enum CrowdsaleStage { PreICO, ICO}

  // Token Distribution
  uint256 public tokenSalePercentage   = 70;
  uint256 public foundersPercentage    = 10;
  uint256 public foundationPercentage  = 10;
  uint256 public partnersPercentage    = 10;
// const  rate;
  // Default to PreICO stage
  CrowdsaleStage public stage = CrowdsaleStage.PreICO;


// Constructor of CrowdSale Contract
  function trabicCrowdSale(uint256 _rate, address  _wallet,ERC20 _token,uint _cap,uint256 openingTime, uint256 closingTime, uint256 _goal)

  Crowdsale(_rate,_wallet,_token)
  CappedCrowdsale(_cap)
    TimedCrowdsale(openingTime , closingTime)
     RefundableCrowdsale(_goal) 
      public {

    require(_goal < _cap, "CrowdFunding reached Hard Cap");
         
}


// Set CrowdSaleStages  only Admin can set

function setCrowdSaleStage(uint256 _stage) public onlyOwner{

if( uint(CrowdsaleStage.PreICO)== _stage ){
  stage = CrowdsaleStage.PreICO;
}
else if(uint(CrowdsaleStage.ICO)== _stage){
  
  stage = CrowdsaleStage.ICO;
}


if(stage == CrowdsaleStage.PreICO){
   
   super.setRate(500);
}
else if(stage == CrowdsaleStage.ICO){
    super.setRate( 250);
   
}

}


  /**
   * @dev forwards funds to the wallet during the PreICO stage, then the refund vault during ICO stage
   */
  function _forwardFunds() internal {
    if(stage == CrowdsaleStage.PreICO) {
    address  wallet;
    wallet.transfer(msg.value);
    } else if (stage == CrowdsaleStage.ICO) {
      super._forwardFunds();
    }
  }




  /**
   * @dev enables token transfers, called when owner calls finalize()
  */
  // function finalization() internal {
  //   if(goalReached()) {
  //     ERC20Mintable _mintableToken =  ERC20Mintable(token);
  //     // Do more stuff....
  //     _mintableToken.finishMinting();
  //     // Unpause the token
  //     ERC20Pausable(token).unpause();
  //   }

  //   super.finalization();
  // }

}
