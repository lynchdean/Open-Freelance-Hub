var UserAccount = artifacts.require("./UserAccount.sol");

contract('UserAccount', function(accounts){
  it("Should set up an account", function(){
    return UserAccount.deployed().then(function(instance){
      deployedUsers = instance
      return deployedUsers.setAccount("Dave", "Weir",{from: accounts[0]})
    }).then(function(userTrans){
      return deployedUsers.getAccounts.call()
    }).then(function(accs){
      return deployedUsers.getAccount.call(accs[0]);
    }).then(function(me){
      console.log(me);
    })
  })
})
