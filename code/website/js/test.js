if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

console.log(web3.eth.accounts);

var contractAddr = '0x5f34672a95dce82b190b3c0becfec98052ef2460'
var contractAbi =
[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"posterAccounts","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getJobCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"i","type":"uint256"}],"name":"getJobs","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"title","type":"string"},{"name":"desc","type":"string"},{"name":"pay","type":"uint256"}],"name":"addJob","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

var contractInstance = web3.eth.contract(contractAbi).at(contractAddr);


contractInstance.addJob("Python", "Description of the job it is a hefty long thing i am testing right now. This is from the BLOOOOOCK CHAIN", 1, {gas: 1000000, from: web3.eth.accounts[0]});
contractInstance.addJob("Java", "Description", 2, {gas: 1000000, from: web3.eth.accounts[0]});
contractInstance.addJob("Test", "Description", 3, {gas: 1000000, from: web3.eth.accounts[0]});
contractInstance.addJob("Masm", "Description", 4, {gas: 1000000, from: web3.eth.accounts[0]});

console.log(contractInstance.getJobCount());

var jobs = [];

for (var i=0; i<4; i++){
  console.log(contractInstance.getJobs(i));
  jobs.push(contractInstance.getJobs(i));
}

var app = angular.module('pageDisplay', []);

app.controller('displayPage', function($scope){
  $scope.jobs = jobs;
})
