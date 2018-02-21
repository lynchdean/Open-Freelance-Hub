pragma solidity ^0.4.4;

contract Accounts {
  struct Account {
    bytes16 firstName;
    bytes16 lastName;
    uint[] employerJobs;
    uint[] workerJobs;
  }

  mapping (address => Account) accounts;
  address[] public allAccounts;

/*
  event accountInfo(
    bytes16 firstName,
    bytes16 lastName
    );
*/

  function setAccount(address _address, bytes16 _firstName, bytes16 _lastName) public {
    var account = accounts[_address];

    account.firstName = _firstName;
    account.lastName = _lastName;
    account.employerJobs;
    account.workerJobs;

    allAccounts.push(_address);
    //accountInfo(_firstName, _lastName);
  }

  function getAccounts() constant returns(address[]) {
    return allAccounts;
  }

  function getAccount(address _address) constant returns (bytes16, bytes16, uint[], uint[]) {
    return (accounts[_address].firstName, accounts[_address].lastName, accounts[_address].employerJobs, accounts[_address]. workerJobs);
  }

  function addEmployerJob(address _address, uint id) public {
    accounts[_address].employerJobs.push(id);
  }

  function addWorkerJob(address _address, uint id) public {
    accounts[_address].workerJobs.push(id);
  }

  function countAccounts() constant returns (uint) {
    return allAccounts.length;
  }

  function getWorkerJobs(address _address) public constant returns (uint[]) {
    return workerJobs;
  }

  function getEmployerJobs(address _address) public constant returns (uint[]) {
    return employerJobs;
  }

}
