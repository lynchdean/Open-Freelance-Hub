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
  var defaultAcc = '0x0000000000000000000000000000000000000000';
  $scope.jobs = [];
  $scope.statuses = []
  $scope.isStart = false;
  $scope.isLast = false;

  var url = (window.location.href).split("?");
  $scope.pageId = url[1];
  if ($scope.pageId == null || $scope.pageId <= 1) {
    $scope.pageId = 1;
    $scope.isStart = true;
  } else {
    $scope.pageId = parseInt($scope.pageId);
  }

  var pageDisplayNum = $scope.pageId * 10
  var pageDisplayStart = pageDisplayNum - 10;

  jobPostInstance.getJobCount.call(function(err, count){
    if (pageDisplayNum >= count) {
      pageDisplayNum = count;
      $scope.isLast = true;
    }
    for (var i=pageDisplayStart; i<pageDisplayNum; i++){
      jobPostInstance.getJob.call(i,function(err,result){
        jobPostInstance.getWorker.call(result[0], function(err, worker){
          jobPostInstance.isComplete.call(result[0], function(err, isCompleted){
        console.log(result);
        $scope.$apply(function(){
          if (worker == defaultAcc && !isCompleted){
            status = "Open";
          } else if (worker != defaultAcc && !isCompleted) {
            console.log(worker)
            status = "In Progress";
          } else {
            status = "Closed";
          }
          var jobObj = {
            id: result[0],
            title: result[1],
            description: result[2],
            payment: web3.fromWei(result[3].toNumber()),
            status: status,
          }
          $scope.jobs.push(jobObj);
        })


            var jobCard = document.getElementById('jobCard'+result[0])
            var status;
            $scope.$apply(function(){
              if (worker == defaultAcc && !isCompleted){
                jobCard.className += " openJob";
              } else if (worker != defaultAcc && !isCompleted) {
                jobCard.className += " inProgressJob";
              } else {
                jobCard.className += " closedJob";
              }
            })
          })
        })
      });
    }
  })
})

app.controller('showOpenJobs', function($scope){
  var defaultAcc = '0x0000000000000000000000000000000000000000';
  $scope.jobs = [];
  $scope.isStart = false;
  $scope.isLast = false;

  var url = (window.location.href).split("?");
  $scope.pageId = url[1];
  if ($scope.pageId == null || $scope.pageId <= 1) {
    $scope.pageId = 1;
    $scope.isStart = true;
  } else {
    $scope.pageId = parseInt($scope.pageId);
  }

  var pageDisplayNum = $scope.pageId * 10
  var pageDisplayStart = pageDisplayNum - 10;

  jobPostInstance.getJobCount.call(function(err, count){
    if (pageDisplayNum >= count) {
      pageDisplayNum = count;
      $scope.isLast = true;
    }
    for (var i=pageDisplayStart; i<pageDisplayNum; i++){
      jobPostInstance.getJob.call(i,function(err,result){
        jobPostInstance.isComplete.call(result[0], function(err, isCompleted){
          jobPostInstance.getWorker.call(result[0], function(err, worker){
            if(worker == defaultAcc && !isCompleted){
              console.log(result);
              $scope.$apply(function(){
                if (worker == defaultAcc && !isCompleted){
                  status = "Open";
                } else if (worker != defaultAcc && !isCompleted) {
                  console.log(worker)
                  status = "In Progress";
                } else {
                  status = "Closed";
                }
                var jobObj = {
                  id: result[0],
                  title: result[1],
                  description: result[2],
                  payment: web3.fromWei(result[3].toNumber()),
                  status: status,
                }
                $scope.jobs.push(jobObj);
              })
                var jobCard = document.getElementById('jobCard'+result[0])
                if (worker == defaultAcc && !isCompleted){
                  jobCard.className += " openJob";
                } else if (worker != defaultAcc && !isCompleted) {
                  jobCard.className += " inProgressJob";
                } else {
                  jobCard.className += " closedJob";
                }

              }
            });
        }
    })
})

// controller to show details of one job in an individual job page
app.controller('showJob', function($scope) {
    $scope.job;
    var url = (window.location.href).split("?");
    var jobId = parseInt(url[1]);

    jobPostInstance.getJob.call(jobId, function(err, result) {
        jobPostInstance.isComplete.call(jobId, function(err, isCompleted) {
            $scope.$apply(function() {
                $scope.job = {
                    id: result[0],
                    title: result[1],
                    description: result[2],
                    payment: web3.fromWei(result[3].toNumber())
                };
            })
            if (isCompleted) {
                var completeBtn = document.getElementById('completeJobButton');
                completeBtn.className += " disabled";
                var cancelBtn = document.getElementById('cancelJobButton');
                cancelBtn.className += " disabled";
                var applyBtn = document.getElementById('applyButton');
                applyBtn.className += " disabled";
            }
        })
    })
})

app.controller('showApplicants', function($scope) {
    $scope.applicants;
    var url = (window.location.href).split("?");
    var jobId = parseInt(url[1]);

    jobPostInstance.getApplicants.call(jobId, function(err, applicants) {
        $scope.$apply(function() {
            $scope.applicants = applicants;
        })
    })

    $scope.acceptApplicant = function(index) {
        acceptApplicant(index);
    }
})

app.controller('checkOwner', function($scope) {
    $scope.isOwner = false;
    var url = (window.location.href).split("?");
    var jobId = parseInt(url[1]);

    web3.eth.getAccounts(function(err, accounts) {
        jobPostInstance.getJob.call(jobId, function(err, job) {
            $scope.$apply(function() {
                $scope.isOwner = (job[4] == accounts[0])
            })
        })
    })
})

// Checks if there is an accepted applicant for a job, and also if the accepted applicant is looking at the page.
app.controller('acceptedApplicant', function($scope) {
    $scope.applicantAccepted = false;
    $scope.isWorker = false;
    var url = (window.location.href).split("?");
    var jobId = parseInt(url[1]);

    web3.eth.getAccounts(function(err, accounts) {
        jobPostInstance.getWorker(jobId, function(err, worker) {
            console.log(worker);
            if (worker != '0x0000000000000000000000000000000000000000') {
                $scope.$apply(function() {
                    $scope.applicantAccepted = true;
                })
            }
            $scope.$apply(function() {
                $scope.worker = worker;
            })
            if (worker == accounts[0]) {
                $scope.isWorker = true;
            }
        })
    })
})
