// initialising web3 provider, or connecting to established provider
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
var jobs = [];

// address & abi of JobPost.sol contract
var contractAddr = '0xd1e261033c54a77a59f346745a0b6dcf99651498'
var contractAbi =
[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"posterAccounts","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getJobCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"i","type":"uint256"}],"name":"getJobs","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"title","type":"string"},{"name":"desc","type":"string"},{"name":"pay","type":"uint256"}],"name":"addJob","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

// getting an intance of hosted contract
var contractInstance = web3.eth.contract(contractAbi).at(contractAddr);

web3.eth.getAccounts(function(err, accounts) {
  contractInstance.getJobCount(function(err, result){if(!err){console.log(result)} else{console.log(err)}});
})

// outputs first 7 jobs of the JobPost contract
function outputToConsole(){
  for (var i=0; i<7; i++){
    var a = contractInstance.getJobs.call(i,function(err,result){
      console.log(result);
    });
  };
}

// adds a job to the JobPost contract
function addJob(title, desc, pay){
  var contractInstance = web3.eth.contract(contractAbi).at(contractAddr);

  web3.eth.getAccounts(function(err, accounts){
    contractInstance.addJob(title, desc, pay, {gas: 1000000, from: accounts[0]}, function(err, result){
      if(err)
        console.log(err);
    });
  })
}
