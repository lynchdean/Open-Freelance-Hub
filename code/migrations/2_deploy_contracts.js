
var JobPost = artifacts.require("./JobPost.sol");
var UserAccount = artifacts.require("./UserAccount.sol")

module.exports = function(deployer) {
  deployer.deploy(JobPost);
  deployer.deploy(UserAccount)
};
