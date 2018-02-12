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
        if(accountInfo[0] != '0x00000000000000000000000000000000'){
        jobPostInstance.addJob(title, desc, pay, {from: accounts[0]}, function(err, result){
          if(err)
            console.log(err);
          else
            alert("Job posted successfully");
        });
      } else {
        alert("This account is not registered");
      }
    })
  })
}

// listening for post button click
window.onload = function(){
  document.getElementById('postButton').addEventListener('click', function(event){
    event.preventDefault();
    var title = document.getElementById('titleInput').value;
    var description = document.getElementById('descriptionInput').value;
    try{
      var payment = parseInt(document.getElementById('paymentInput').value);
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
      /*
      web3.eth.getAccounts(function(err, accounts){
        jobPostInstance.addJob(title, description, payment, {gas: 1000000, from: accounts[0]}, function(err, result){
          if(err)
            console.log(err);
        });
      })
      */
    }
  })
}
