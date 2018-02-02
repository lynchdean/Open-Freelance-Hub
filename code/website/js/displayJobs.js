// display a list of jobs to the html page
// well hopefully

// initialising web3 provider, or connecting to established provider
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
var jobs = [];

// address & abi of JobPost.sol contract
var contractAddr = '0x1c81bee0a13bce16ebc2009ffb37bb43f46c7c48'
var contractAbi =
[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"posterAccounts","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getJobCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"i","type":"uint256"}],"name":"getJobs","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"title","type":"string"},{"name":"desc","type":"string"},{"name":"pay","type":"uint256"}],"name":"addJob","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

// getting an intance of hosted contract
var contractInstance = web3.eth.contract(contractAbi).at(contractAddr);

// angularjs to display all jobs
var app = angular.module('displayPage', []);

app.controller('showPages', function($scope){
  $scope.jobs = [];

  contractInstance.getJobCount.call(function(err, count){
    for (var i=0; i<count; i++){
      contractInstance.getJobs.call(i,function(err,result){
        $scope.$apply(function(){
          var jobObj = {
            title: result[0],
            description: result[1],
            payment: result[2].toNumber()
          }
          $scope.jobs.push(jobObj);
        })
      });
    }
  })
})
