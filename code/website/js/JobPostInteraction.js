// initialising web3 provider, or connecting to established provider
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
var jobs = [];

// address & abi of JobPost.sol contract
var contractAddr = '0xd66755363f012127d0653c037fc24f1499772736'
var contractAbi = [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"posterAccounts","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getJobCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"i","type":"uint256"}],"name":"getJob","outputs":[{"name":"","type":"uint256"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"title","type":"string"},{"name":"desc","type":"string"},{"name":"pay","type":"uint256"}],"name":"addJob","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]


// getting an intance of hosted contract
var contractInstance = web3.eth.contract(contractAbi).at(contractAddr);

web3.eth.getAccounts(function(err, accounts) {
  contractInstance.getJobCount(function(err, result){console.log(result)});
})

// adds a job to the JobPost contract
function addJob(title, desc, pay){
  var contractInstance = web3.eth.contract(contractAbi).at(contractAddr);

  web3.eth.getAccounts(function(err, accounts){
    contractInstance.addJob(title, desc, pay, function(err, result){
      if(err)
        console.log(err);
    });
  })
}

// listening for post button click
window.onload = function(){
  document.getElementById('postButton').addEventListener('click', function(){
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
      web3.eth.getAccounts(function(err, accounts){
        contractInstance.addJob(title, description, payment, {gas: 1000000, from: accounts[0]}, function(err, result){
          if(err)
            console.log(err);
        });
      })
    }
  })
}
