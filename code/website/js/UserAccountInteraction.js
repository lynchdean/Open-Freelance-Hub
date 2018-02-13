// initialising web3 provider, or connecting to established provider
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

// getting an intance of hosted contract
var userInstance = web3.eth.contract(UserAbi).at(UserAddr);

function addAccount(firstname, surname){
  web3.eth.getAccounts(function(err, accounts){
    console.log(accounts);
    userInstance.getAccount.call(accounts[0], function(err, accountInfo){
      console.log("__________________")
      console.log(accounts[0]);
      if (accountInfo[0] == '0x00000000000000000000000000000000'){
        userInstance.setAccount(accounts[0], firstname, surname, function(err, result){
          if(err){
            console.log(err);
          } else {
            console.log(result);
            alert("Thank you for registering")
          }
        });
      } else {
        alert("This account is already registered");
      }
    })
  })
}

window.onload = function(){
  document.getElementById('registerButton').addEventListener('click', function(event){
    event.preventDefault();
    var firstname = document.getElementById('firstnameInput').value;
    var surname = document.getElementById('surnameInput').value;
    addAccount(firstname, surname);
  })
}
