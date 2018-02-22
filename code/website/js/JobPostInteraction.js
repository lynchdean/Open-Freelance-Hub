// initialising web3 provider, or connecting to established provider
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
var jobs = [];


// Get intance of hosted contract
var jobPostInstance = web3.eth.contract(JobPostAbi).at(JobPostAddr);
var userInstance = web3.eth.contract(UserAbi).at(UserAddr);

// Add job to the JobPost contract
function addJob(title, desc, pay) {
    var jobPostInstance = web3.eth.contract(JobPostAbi).at(JobPostAddr);
    var userInstance = web3.eth.contract(UserAbi).at(UserAddr)

    web3.eth.getAccounts(function(err, accounts) {
        console.log(accounts);
        userInstance.getAccount(accounts[0], function(err, accountInfo) {
            console.log(accountInfo);
            // Check if the account is registered
            if (accountInfo[0] != '0x00000000000000000000000000000000') {
                var amount = parseFloat(web3.toWei(pay, 'ether'));
                jobPostInstance.addJob(title, desc, amount, {
                    from: accounts[0],
                    value: amount
                }, function(err, result) {
                    if (err)
                        console.log(err);
                    else {
                        console.log(result);
                        alert("Job posted successfully");

                        // Add job to owners emplyerJobs list
                        jobPostInstance.getJobCount.call(function(error, jobCount) {
                            if (!error) {
                                userInstance.addEmployerJob(accounts[0], jobCount - 1, (err, result) => {
                                    if (!err)
                                        console.log("Added to EmployerJobs")
                                    else {
                                        console.log("Not added to EmployerJobs")
                                    }
                                })
                            } else
                                console.error(error);
                        });
                    }
                });
            } else {
                alert("This account is not registered");
            }
        })
    })
}

// Apply worker to a job
function applyToJob() {
    web3.eth.getAccounts(function(err, accounts) {
        userInstance.getAccount(accounts[0], function(err, accountInfo) {
            // check if the account is registered
            if (accountInfo[0] != '0x00000000000000000000000000000000') {
                var url = (window.location.href).split("?");
                var jobId = parseInt(url[1]);
                jobPostInstance.getJob(jobId, function(err, job) {
                    if (job[4] != accounts[0]) {
                        jobPostInstance.getApplicants(jobId, function(err, applicants) {
                            var isUnique = true;
                            for (var i = 0; i < applicants.length; i++) {
                                if (applicants[i] == accounts[0]) {
                                    alert("You can only apply to a job once");
                                    isUnique = false;
                                }
                            }
                            if (isUnique) {
                                jobPostInstance.applyToJob(jobId, function(err, result) {
                                    if (err)
                                        console.log(err);
                                    else {
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

// Assign candidate to a job
function acceptApplicant(index) {
    var url = (window.location.href).split("?");
    var jobId = parseInt(url[1]);

    jobPostInstance.getApplicants(jobId, function(err, applicants) {
        if (confirm("Are you sure you want to accept this Applicant?")) {
            jobPostInstance.setWorker(jobId, applicants[index], function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    // Add job to creators workerJobs list
                    jobPostInstance.getJobCount.call(function(error, jobCount) {
                        if (!error) {
                            console.log(jobCount);
                            userInstance.addWorkerJob(accounts[0], jobCount - 1, (err, result) => {
                                if (!err)
                                    console.log("Added to workerJobs")
                                else {
                                    console.log("Not added to workerJobs")
                                }
                            })
                        } else
                            console.error(error);
                    })
                }
            })
        }

    })
}

// Mark a job as completed and processes payment
function completeJob() {
    var url = (window.location.href).split("?");
    var jobId = parseInt(url[1]);

    jobPostInstance.isComplete.call(jobId, function(err, isCompleted) {
        console.log(isCompleted);
        if (isCompleted) {
            alert("Job is already complete");
        } else {
            if (confirm("Are you sure you want to complete this job?")) {
                jobPostInstance.completeJob(jobId, function(err, result) {
                    var completeBtn = document.getElementById('completeJobButton');
                    completeBtn.className += " disabled";
                    var cancelBtn = document.getElementById('cancelJobButton');
                    cancelBtn.className += " disabled";
                })
            }

        }
    })
}

// Marks a job as complete and returns payment to the owner.
function cancelJob() {
    var url = (window.location.href).split("?");
    var jobId = parseInt(url[1]);
    jobPostInstance.isComplete(jobId, function(err, isCompleted) {
        if (isCompleted) {
            alert("Job is already completed");
        } else {
            if (confirm("Are you sure you want to cancel this job?")) {
                jobPostInstance.cancelJob(jobId, function(err, result) {
                    var completeBtn = document.getElementById('completeJobButton');
                    completeBtn.className += " disabled";
                    var cancelBtn = document.getElementById('cancelJobButton');
                    cancelBtn.className += " disabled";
                })
            }
        }

    })
}


window.onload = function() {
    var url = (window.location.href).split("/");
    // listening for post button click when on postJob.html
    // validates that the inputs are of the correct type
    if (url[3] == "postJob.html") {
        document.getElementById('postButton').addEventListener('click', function(event) {
            event.preventDefault();
            var title = document.getElementById('titleInput').value;
            var description = document.getElementById('descriptionInput').value;
            try {
                var payment = parseFloat(document.getElementById('paymentInput').value);
            } catch (err) {
                alert("The payment must be a number")
            }


            if (typeof(title) != "string") {
                alert("The title must be a string");
            } else if (typeof(description) != "string") {
                alert("The description must be a string");
            } else if (typeof(payment) != "number") {
                alert("The payment must be a number")
            } else if (payment < 0) {
                alert("The payment must be a positive number")
            } else {
                addJob(title, description, payment);
            }
        })
    }

    // listening for apply button click when on a job page
    if (url[3].split("?")[0] == "job.html") {
        document.getElementById('applyButton').addEventListener('click', function(event) {
            event.preventDefault();
            applyToJob();
        })

        document.getElementById('completeJobButton').addEventListener('click', function(event) {
            event.preventDefault();
            completeJob();
        })

        document.getElementById('cancelJobButton').addEventListener('click', function(event) {
            event.preventDefault();
            cancelJob();
        })

    }
}
