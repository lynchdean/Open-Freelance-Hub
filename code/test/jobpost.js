var JobPost = artifacts.require("./JobPost.sol");

contract('JobPost', function(accounts){
  it("Should post a job and retrieve successfully", function(){
    var title = "Job Test";
    var description = "This is a test description for a job posting on the blockchain";
    var payment = 12;

    return JobPost.deployed().then(function(instance){
      deployedJob = instance;
      return deployedJob.addJob(title, description, payment, {from: accounts[0]});
    }).then(function(jobTrans){
      return deployedJob.getJobs.call(title);
    }).then(function(retrievedJob){
      assert.equal(retrievedJob[0], title, "Title returned incorrect");
      assert.equal(retrievedJob[1], description, "Description returned incorrect");
      assert.equal(retrievedJob[2].toNumber(), payment, "Payment returned incorrect");
    })
  })
})
