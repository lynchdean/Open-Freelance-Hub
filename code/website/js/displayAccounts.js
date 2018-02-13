// display a list of accounts to the html page

// initialising web3 provider, or connecting to established provider
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
var accounts = [];

// getting an intance of hosted contract
var accountInstance = web3.eth.contract(UserAbi).at(UserAddr);

// ANGULAR

// angularjs to display all accounts
var app = angular.module('displayPage', []);

// controller to show all accounts uploaded to the blockchain for homepage
app.controller('showPages', function($scope){
    $scope.accounts = [];

    accountInstance.getAccounts.call(function(err, allAccounts){
        for (var i = 0; i < allAccounts.length; i++){
            accountInstance.getAccount.call(allAccounts[i], function(err,result){
                console.log(result);
                $scope.$apply(function(){
                    var accountObj = {
                        firstName: web3.toAscii(result[0]).replace(/\u0000/g, ''),
                        lastName: web3.toAscii(result[1]).replace(/\u0000/g, '')
                    }
                    $scope.accounts.push(accountObj);
                })
            });
        }
    })
})
