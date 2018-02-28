// display a list of accounts to the html page

// initialising web3 provider, or connecting to established provider
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

// getting an intance of hosted contract
var accountInstance = web3.eth.contract(UserAbi).at(UserAddr);
var jobPostInstance = web3.eth.contract(JobPostAbi).at(JobPostAddr);

var url = (window.location.href).split("?");
var accountAddr = web3.eth.defaultAccount;
var defaultAcc = '0x0000000000000000000000000000000000000000';

if (url.length > 1) {
    accountAddr = url[1];
}

// Update account details page.
accountInstance.getAccount(accountAddr, (err, res) => {
    if (!err) {
        $("#firstName").html(web3.toAscii(res[0]));
        $("#lastName").html(web3.toAscii(res[1]));
    } else {
        console.log("No account");
    }
});

// ANGULAR

// angularjs to display all accounts
var app = angular.module('displayPage', []);

// controller to show all accounts uploaded to the blockchain for homepage
app.controller('showAllAccounts', function($scope){
    $scope.accounts = [];

    accountInstance.getAccounts.call(function(err, allAccounts){
        for (var i = 0; i < allAccounts.length; i++){
            accountInstance.getAccount.call(allAccounts[i], function(err,result){
                $scope.$apply(function(){
                    var accountObj = {
                        addr: result[4],
                        firstName: web3.toAscii(result[0]).replace(/\u0000/g, ''),
                        lastName: web3.toAscii(result[1]).replace(/\u0000/g, '')
                    }
                    $scope.accounts.push(accountObj);
                })
            });
        }
    })
})


// Get all of the jobs associated with an account
app.controller('showAccountJobs', function($scope){
    $scope.employerJobs = [];
    $scope.workerJobs = [];

    // Get a list of all the jobs a user has created
    accountInstance.getEmployerJobs.call(accountAddr, function(err, employerJobs){
        for (i in employerJobs) {
          var jobId = employerJobs[i]
            jobPostInstance.getJob.call(jobId, function(err, result){
              jobPostInstance.getWorker.call(result[0], function(err, worker){
                jobPostInstance.isComplete.call(result[0], function(err, isCompleted){
                  $scope.$apply(function() {
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
                          payment:  web3.fromWei(result[3].toNumber()),
                          status: status,
                      }
                      console.log(jobObj);
                      $scope.employerJobs.push(jobObj);
                  })
                  var jobCard = document.getElementById('employerJobCard'+result[0])
                  if (worker == defaultAcc && !isCompleted){
                    jobCard.className += " openJob";
                  } else if (worker != defaultAcc && !isCompleted) {
                    jobCard.className += " inProgressJob";
                  } else {
                    jobCard.className += " closedJob";
                  }
                })
              })
            });

        }
    })

    // Get a list of all the jobs a user has been assigned to
    accountInstance.getWorkerJobs.call(accountAddr, function(err, res){
        for (var i = 0; i < res.length; i++) {
            jobPostInstance.getJob.call(res[i], function(err, result){
              jobPostInstance.getWorker.call(result[0], function(err, worker){
                jobPostInstance.isComplete.call(result[0], function(err, isCompleted){
                  $scope.$apply(function() {
                    if (worker == defaultAcc && !isCompleted){
                      status = "Open";
                    } else if (worker != defaultAcc && !isCompleted) {
                      status = "In Progress";
                    } else {
                      status = "Closed";
                    }
                      var jobObj = {
                          id: result[0],
                          title: result[1],
                          description: result[2],
                          payment:  web3.fromWei(result[3].toNumber()),
                          status: status,
                      }
                      console.log(jobObj);
                      $scope.workerJobs.push(jobObj);
                  })
                  var jobCard = document.getElementById('workerJobCard'+result[0])
                  if (worker == defaultAcc && !isCompleted){
                    jobCard.className += " openJob";
                  } else if (worker != defaultAcc && !isCompleted) {
                    jobCard.className += " inProgressJob";
                  } else {
                    jobCard.className += " closedJob";
                  }
                })
              })
            });

        }
    })
})

app.controller('showAccount', function($scope){
  $scope.account;
  accountInstance.getAccount.call(accountAddr, function(err, accountDetails){
    $scope.$apply(function(){
      var accountObj = {
        addr: accountDetails[4],
        firstName: web3.toAscii(accountDetails[0]).replace(/\u0000/g, ''),
        lastName: web3.toAscii(accountDetails[1]).replace(/\u0000/g, '')
      }

      $scope.account = accountObj;
    })
  })
})
