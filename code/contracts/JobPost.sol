pragma solidity ^0.4.4;

contract JobPost{
  struct Job {
    uint id;
    string title;
    string description;
    uint payment;
    address owner;
    address[] applicants;
    address worker;
    bool isCompleted;
  }

  uint totalJobs = 0;
  mapping (uint => Job) allJobs;
  address[] public posterAccounts;

  function addJob(string title, string desc, uint pay) public payable {
    var job = allJobs[totalJobs];
    require(pay == msg.value);

    job.id = totalJobs;
    job.title = title;
    job.description = desc;
    job.payment = msg.value;
    job.owner = msg.sender;
    job.applicants;
    job.worker;
    job.isCompleted = false;

    totalJobs += 1;

    posterAccounts.push(msg.sender);
  }

  function getJob(uint i) public constant returns(uint,string,string, uint, address) {

    return (allJobs[i].id, allJobs[i].title, allJobs[i].description, allJobs[i].payment, allJobs[i].owner);
  }

  function getJobCount() public constant returns (uint){
    return totalJobs;
  }

  function applyToJob(uint i) public {
    var job = allJobs[i];
    job.applicants.push(msg.sender);
  }

  function getApplicants(uint i) public constant returns(address[]){
    return allJobs[i].applicants;
  }

  function setWorker(uint jobId, address candidate) public {
    var job = allJobs[jobId];
    job.worker = candidate;
  }

  function getWorker(uint jobId) public constant returns (address) {
    var job = allJobs[jobId];
    return job.worker;
  }

  function completeJob(uint jobId) public {
    var job = allJobs[jobId];
    (job.worker).transfer(job.payment);
    job.isCompleted = true;
  }

  function isComplete(uint jobId) public constant returns (bool){
    var job = allJobs[jobId];
    return job.isCompleted;
  }

  function cancelJob(uint jobId) public {
    var job = allJobs[jobId];
    job.isCompleted = true;
    job.owner.transfer(job.payment);
  }

}
