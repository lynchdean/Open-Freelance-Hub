// initialising web3 provider, or connecting to established provider
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
var jobs = [];


// getting an intance of hosted contract
var jobPostInstance = web3.eth.contract(JobPostAbi).at(JobPostAddr);
var userInstance = web3.eth.contract(UserAbi).at(UserAddr);

userInstance.getAccount(web3.eth.defaultAccount, (err, res) => {
  if (!err) {
    $("#firstName").html(web3.toAscii(res[0]));
    $("#lastName").html(web3.toAscii(res[1]));
  } else {
    console.log("No account");
  }
});
