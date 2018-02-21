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

// adds a job to the JobPost contract
function addJob(title, desc, pay){
  var jobPostInstance = web3.eth.contract(JobPostAbi).at(JobPostAddr);
  var userInstance = web3.eth.contract(UserAbi).at(UserAddr)

  web3.eth.getAccounts(function(err, accounts){
    console.log(accounts);
    userInstance.getAccount(accounts[0], function(err, accountInfo){
      console.log(accountInfo);
      // check if the account is registered
      if(accountInfo[0] != '0x00000000000000000000000000000000'){
        var amount = parseFloat(web3.toWei(pay, 'ether'));
        jobPostInstance.addJob(title, desc, amount, {from: accounts[0], value: amount}, function(err, result){
          if(err)
            console.log(err);
          else{
          console.log(result)
            alert("Job posted successfully");
          }
        });
      } else {
        alert("This account is not registered");
      }
    })
  })
}

// applies a worker to a job
function applyToJob(){
  web3.eth.getAccounts(function(err,accounts){
    userInstance.getAccount(accounts[0], function(err, accountInfo){
      // check if the account is registered
      if(accountInfo[0] != '0x00000000000000000000000000000000'){
        var url = (window.location.href).split("?");
        var jobId = parseInt(url[1]);
        jobPostInstance.getJob(jobId, function(err, job){
          if(job[4] != accounts[0]){
            jobPostInstance.getApplicants(jobId, function(err, applicants){
              var isUnique = true;
              for (var i=0; i<applicants.length; i++){
                if (applicants[i] == accounts[0]){
                  alert("You can only apply to a job once");
                  isUnique = false;
                }
              }
              if(isUnique){
                jobPostInstance.applyToJob(jobId, function(err, result){
                  if(err)
                    console.log(err);
                  else{
                  console.log(result)
                    alert("Success!");
                  }
                })
              }
            })
          } else {
            alert("You cannot apply to your own job");
          }
        })
      } else {
        alert("This account is not registered");
      }
    })
  })
}

// assigns a candidate to the job
function acceptApplicant(index){
  var url = (window.location.href).split("?");
  var jobId = parseInt(url[1]);

  jobPostInstance.getApplicants(jobId, function(err, applicants){
    jobPostInstance.setWorker(jobId, applicants[index], function(err, result){
      if(err){
        console.log(err);
      }
      jobPostInstance.getWorker(jobId, function(err, result){
        console.log(result);
      })
    })
  })
}

function completeJob(){
  var url = (window.location.href).split("?");
  var jobId = parseInt(url[1]);

  jobPostInstance.isComplete.call(jobId, function(err, isCompleted){
    console.log(isCompleted);
    if(isCompleted){
      alert("Job is already complete");
    } else {
      jobPostInstance.completeJob(jobId, function(err, result){
        console.log(result);
        var completeBtn = document.getElementById('completeJobButton');
        completeBtn.className += " disabled";
        var cancelBtn = document.getElementById('cancelJobButton');
        cancelBtn.className += " disabled";
      })
    }
  })
}

function cancelJob(){
  var url = (window.location.href).split("?");
  var jobId = parseInt(url[1]);

  alert("TODO GET THIS TO CANCEL JOB");
}


window.onload = function(){
  var url = (window.location.href).split("/");
  // listening for post button click when on postJob.html
  // validates that the inputs are of the correct type
  if(url[3] == "postJob.html"){
    document.getElementById('postButton').addEventListener('click', function(event){
      event.preventDefault();
      var title = document.getElementById('titleInput').value;
      var description = document.getElementById('descriptionInput').value;
      try{
        var payment = parseFloat(document.getElementById('paymentInput').value);
      } catch (err){
        alert("The payment must be a number")
      }


      if (typeof(title) != "string"){
        alert("The title must be a string");
      } else if (typeof(description) != "string"){
        alert("The description must be a string");
      } else if (typeof(payment) != "number"){
        alert("The payment must be a number")
      } else if (payment < 0){
        alert("The payment must be a positive number")
      } else {
        addJob(title, description, payment);
      }
    })
  }

  // listening for apply button click when on a job page
  if (url[3].split("?")[0] == "job.html"){
    document.getElementById('applyButton').addEventListener('click', function(event){
      event.preventDefault();
      applyToJob();
    })

    document.getElementById('completeJobButton').addEventListener('click', function(event){
      event.preventDefault();
      completeJob();
    })

    document.getElementById('cancelJobButton').addEventListener('click', function(event){
      event.preventDefault();
      cancelJob();
    })

  }
}