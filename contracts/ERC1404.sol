pragma solidity ^0.4.23;
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Pausable.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
//import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/access/roles/MinterRole.sol";



contract ERC1404 is ERC20Mintable, ERC20Pausable, ERC20Detailed{
  function detectTransferRestriction (address from, address to, uint256 value) public returns (uint8);
  function messageForTransferRestriction (uint8 restrictionCode) public  returns (string memory message);
}