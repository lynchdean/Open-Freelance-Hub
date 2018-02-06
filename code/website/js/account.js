if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

web3.eth.defaultAccount = web3.eth.accounts[0];

var AccountContract = web3.eth.contract(
  [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"allAccounts","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAccounts","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"},{"name":"_firstName","type":"bytes16"},{"name":"_lastName","type":"bytes16"}],"name":"setAccount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"countAccounts","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getAccount","outputs":[{"name":"","type":"bytes16"},{"name":"","type":"bytes16"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"firstName","type":"bytes16"},{"indexed":false,"name":"lastName","type":"bytes16"}],"name":"accountInfo","type":"event"}]
);

var UserAccount = AccountContract.at('0xf23c89f0b10eb8bb03134e30ab6329087e26a16e');

var accountEvent = UserAccount.accountInfo({},'latest');
accountEvent.watch(function (err, result) {
  if (!err) {
    if (result.blockHash != $("#bh").html()) {
      $("#loader").hide();
    }
    $("#name").html(web3.toAscii(result.args.firstName) + ' ' + web3.toAscii(result.args.lastName));
    $("#bh").html(result.blockHash);
  } else {
    $("#loader").hide();
  }
});

UserAccount.countAccounts((err, res) => {
  if (res) {
    $("#countAccs").html(res);
  }
});

UserAccount.getAccount(web3.eth.defaultAccount, (err, res) => {
  if (!err) {
    $("#welcome").html("Welcome, " + web3.toAscii(res[0]) + "!");
  } else {
    $("#welcome").html("Please connect account!");
  }
});

$("#button").click(function() {
  $("#loader").show();
  UserAccount.setAccount(web3.eth.defaultAccount, $("#firstName").val(),$("#lastName").val(), (err, res) => {
    if (!err) {
      $("#loader").hide();
    }
  });
});
