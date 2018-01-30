pragma solidity ^0.4.4;

contract JobPost{
  struct Job {
    string title;
    string description;
    uint payment;
  }

  uint totalJobs = 0;
  mapping (uint => Job) allJobs;
  address[] public posterAccounts;

  function addJob(string title, string desc, uint pay) public{
    var job = allJobs[totalJobs];

    job.title = title;
    job.description = desc;
    job.payment = pay;

    totalJobs += 1;

    posterAccounts.push(msg.sender);
  }

  function getJobs(uint i) constant returns(string,string, uint) {

    return (allJobs[i].title, allJobs[i].description, allJobs[i].payment);
  }

  function getJobCount() constant returns (uint){
    return totalJobs;
  }

}
