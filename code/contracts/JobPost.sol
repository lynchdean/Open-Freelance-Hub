pragma solidity ^0.4.4;

contract JobPost{
  struct Job {
    uint id;
    string title;
    string description;
    uint payment;
    address owner;
  }

  uint totalJobs = 0;
  mapping (uint => Job) allJobs;
  address[] public posterAccounts;

  function addJob(string title, string desc, uint pay) public{
    var job = allJobs[totalJobs];

    job.id = totalJobs;
    job.title = title;
    job.description = desc;
    job.payment = pay;
    job.owner = msg.sender;

    totalJobs += 1;

    posterAccounts.push(msg.sender);
  }

  function getJob(uint i) constant returns(uint,string,string, uint, address) {

    return (allJobs[i].id, allJobs[i].title, allJobs[i].description, allJobs[i].payment, allJobs[i].owner);
  }

  function getJobCount() constant returns (uint){
    return totalJobs;
  }

}
