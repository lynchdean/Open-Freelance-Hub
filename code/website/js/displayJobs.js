// display a list of jobs to the html page

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

// ANGULAR

// angularjs to display all jobs
var app = angular.module('displayPage', []);

// controller to show all jobs uploaded to the blockchain for homepage
app.controller('showPages', function($scope){
  $scope.jobs = [];

  jobPostInstance.getJobCount.call(function(err, count){
    for (var i=0; i<count; i++){
      jobPostInstance.getJob.call(i,function(err,result){
        console.log(result);
        $scope.$apply(function(){
          var jobObj = {
            id: result[0],
            title: result[1],
            description: result[2],
            payment: result[3].toNumber()
          }
          $scope.jobs.push(jobObj);
        })
      });
    }
  })
})

// controller to show details of one job in an individual job page
app.controller('showJob', function($scope){
  $scope.job;
  var url = (window.location.href).split("%");
  var jobId = parseInt(url[1].substring(2));

  jobPostInstance.getJob.call(jobId, function(err, result){
    $scope.$apply(function(){
      $scope.job = {
        id: result[0],
        title: result[1],
        description: result[2],
        payment: result[3].toNumber()
      };
    })
  })
})
