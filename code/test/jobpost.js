var JobPost = artifacts.require("./JobPost.sol");

var title = "Job Test";
var description = "Description Test. This is a Test";
var payment = 12;

contract('JobPost', function(accounts){
  it("Should post a job and retrieve successfully", function(){
    return JobPost.deployed().then(function(instance){
      deployedJob = instance;
      return deployedJob.addJob(title, description, payment, {from: accounts[0]});
    }).then(function(jobTrans){
      return deployedJob.getJob.call(0);
    }).then(function(retrievedJob){
      assert.equal(retrievedJob[0], 0, "Id returned incorrect");
      assert.equal(retrievedJob[1], title, "Title returned incorrect");
      assert.equal(retrievedJob[2], description, "Description returned incorrect");
      assert.equal(retrievedJob[3].toNumber(), payment, "Payment returned incorrect");
      console.log(retrievedJob[4])
    })
  })

  it("Should return the correct count of posted Jobs", function(){
    return JobPost.deployed().then(function(instance){
      deployedJob = instance;
      return (deployedJob.getJobCount.call());
    }).then(function(jobCount){
      assert.equal(jobCount, 1, "Incorrect job count returned before job added");
      return deployedJob.addJob(title, description, payment, {from: accounts[0]});
    }).then(function(jobTrans){
      return (deployedJob.getJobCount.call());
    }).then(function(jobCount){
      assert.equal(jobCount, 2, "Incorrect job count after new job added");
    })
  })
})
