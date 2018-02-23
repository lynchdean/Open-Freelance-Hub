// initialising web3 provider, or connecting to established provider
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

web3.eth.defaultAccount = web3.eth.accounts[0];

// getting an intance of hosted contract
var userInstance = web3.eth.contract(UserAbi).at(UserAddr);

// Display first name if signed in.
userInstance.getAccount(web3.eth.defaultAccount, (err, res) => {
    if (res[0] != "0x00000000000000000000000000000000") {
        document.getElementById("welcome").innerHTML = "Welcome, " + (web3.toAscii(res[0]).replace(/\u0000/g, '')) + "!";
        document.getElementById('welcome').setAttribute('href', 'account.html');
    }
})

// Display current Ethereum network.
web3.version.getNetwork((err, netId) => {
  switch (netId) {
    case "1":
        document.getElementById("network").innerHTML = 'Network: Mainnet';
        break
    case "2":
        document.getElementById("network").innerHTML = 'Network: Deprecated Morden test network.'
        break
    case "3":
        document.getElementById("network").innerHTML = 'Network: Ropsten test network.';
        break
    case "4":
        document.getElementById("network").innerHTML = 'Network: Rinkeby test network.';
        break
    case "42":
        document.getElementById("network").innerHTML = 'Network: Kovan test network.';
        break
    default:
        document.getElementById("network").innerHTML = 'Network: Unknown/test network.';
  }
})

function charCount(n) {
    var total = n.value.length;
    document.getElementById("char-count").innerHTML = total + "/200";
}
