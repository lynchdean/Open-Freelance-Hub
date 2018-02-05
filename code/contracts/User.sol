pragma solidity ^0.4.4;

contract Owned {
  address owner;

  function Owned() public {
    owner = msg.sender;
  }

  modifier onlyOwner {
    require(msg.sender == owner);
    _;
  }
}

contract Accounts is Owned {
  struct Account {
    bytes16 firstName;
    bytes16 lastName;
  }

  mapping (address => Account) accounts;
  address[] public allAccounts;

  event accountInfo(
    bytes16 firstName,
    bytes16 lastName
    );

  function setAccount(address _address, bytes16 _firstName, bytes16 _lastName) onlyOwner public {
    var account = accounts[_address];

    account.firstName = _firstName;
    account.lastName = _lastName;

    allAccounts.push(_address);
    accountInfo(_firstName, _lastName);
  }

  function getAccounts() view public returns(address[]) {
    return allAccounts;
  }

  function getAccount(address _address) view public returns (bytes16, bytes16) {
    return (accounts[_address].firstName, accounts[_address].lastName);
  }

  function countAccounts() view public returns (uint) {
    return allAccounts.length;
  }

}
