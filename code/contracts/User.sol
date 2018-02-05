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
    uint[] employerJobs;
    uint[] workerJobs;
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
    account.employerJobs;
    account.workerJobs;

    allAccounts.push(_address);
    accountInfo(_firstName, _lastName);
  }

  function getAccounts() public returns(address[]) {
    return allAccounts;
  }

  function getAccount(address _address) public returns (bytes16, bytes16, uint[], uint[]) {
    return (accounts[_address].firstName, accounts[_address].lastName, accounts[_address].employerJobs, accounts[_address]. workerJobs);
  }

  function addEmployerJob(address _address, uint id) public {
    accounts[_address].employerJobs.push(id);
  }

  function addWorkerJob(address _address, uint id) public {
    accounts[_address].workerJobs.push(id);
  }

  function countAccounts() public returns (uint) {
    return allAccounts.length;
  }

}
