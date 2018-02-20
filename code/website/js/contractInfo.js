// address & abi of JobPost.sol contract
var JobPostAddr = '0x660ed3f514f41d255f26ae6bdd1dc5763d7a77fb'
var JobPostAbi =
[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"posterAccounts","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getJobCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"i","type":"uint256"}],"name":"getJob","outputs":[{"name":"","type":"uint256"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"title","type":"string"},{"name":"desc","type":"string"},{"name":"pay","type":"uint256"}],"name":"addJob","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

var UserAddr = "0xb4b9b5ec9104c429a55cf754eec14053fcd4efe7";
var UserAbi =
[{"constant":false,"inputs":[{"name":"_address","type":"address"},{"name":"id","type":"uint256"}],"name":"addEmployerJob","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"allAccounts","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"},{"name":"id","type":"uint256"}],"name":"addWorkerJob","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAccounts","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"},{"name":"_firstName","type":"bytes16"},{"name":"_lastName","type":"bytes16"}],"name":"setAccount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"isRegisteredAccount","outputs":[{"name":"","type":"bytes16"},{"name":"","type":"bytes16"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"countAccounts","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getAccount","outputs":[{"name":"","type":"bytes16"},{"name":"","type":"bytes16"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"firstName","type":"bytes16"},{"indexed":false,"name":"lastName","type":"bytes16"}],"name":"accountInfo","type":"event"}]
