
var JobPost = artifacts.require("./JobPost.sol");
var UserAccount = artifacts.require("./Accounts.sol")

module.exports = function(deployer) {
  deployer.deploy(JobPost);
  deployer.deploy(UserAccount)
};
