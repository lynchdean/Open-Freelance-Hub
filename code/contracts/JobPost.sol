pragma solidity ^0.4.4;

contract JobPost {
  struct Job {
    string title;
    string description;
    uint payment;
  }

  mapping (string => Job) allJobs;
  address[] public posterAccounts;

  function addJob(string title, string desc, uint pay) public{
    var job = allJobs[title];

    job.title = title;
    job.description = desc;
    job.payment = pay;

    posterAccounts.push(msg.sender);
  }

  function getJobs(string title) returns(string,string, uint) {
    return (allJobs[title].title, allJobs[title].description, allJobs[title].payment);
  }

}
