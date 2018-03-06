// address & abi of JobPost.sol contract
var JobPostAddr = '0x8b34f74159fdc4669d1b008ac43ca67a4ddea4dc';
var JobPostAbi =
[{"constant":false,"inputs":[{"name":"jobId","type":"uint256"}],"name":"cancelJob","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"jobId","type":"uint256"}],"name":"isWorkComplete","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"jobId","type":"uint256"}],"name":"isComplete","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"posterAccounts","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"jobId","type":"uint256"}],"name":"completeWork","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"jobId","type":"uint256"},{"name":"candidate","type":"address"}],"name":"setWorker","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"i","type":"uint256"}],"name":"getApplicants","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"i","type":"uint256"}],"name":"applyToJob","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"jobId","type":"uint256"}],"name":"completeJob","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"jobId","type":"uint256"}],"name":"getWorker","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getJobCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"i","type":"uint256"}],"name":"getJob","outputs":[{"name":"","type":"uint256"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"jobId","type":"uint256"}],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"title","type":"string"},{"name":"desc","type":"string"},{"name":"pay","type":"uint256"}],"name":"addJob","outputs":[],"payable":true,"stateMutability":"payable","type":"function"}]


// address & abi of Account.sol contract
var UserAddr = "0x45e0c58cb037f8d247ed9dc5281f9de64f239931";
var UserAbi =
[{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"getWorkerJobs","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"getEmployerJobs","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"},{"name":"id","type":"uint256"}],"name":"addEmployerJob","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"allAccounts","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"},{"name":"id","type":"uint256"}],"name":"addWorkerJob","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAccounts","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"},{"name":"_firstName","type":"bytes16"},{"name":"_lastName","type":"bytes16"},{"name":"_biography","type":"string"},{"name":"_email","type":"bytes16"}],"name":"setAccount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"countAccounts","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"getAccount","outputs":[{"name":"","type":"bytes16"},{"name":"","type":"bytes16"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"},{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"bytes16"}],"payable":false,"stateMutability":"view","type":"function"}]


// address & abi of Review.sol contract
var ReviewAddr = "0x2aac670e0c6fb6976cc10dfc12a8d99d52f691dd";
var ReviewAbi = [{"constant":true,"inputs":[{"name":"addr","type":"address"}],"name":"getSentReviews","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"}],"name":"getReceivedReviews","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getReviewCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"reviewID","type":"uint256"}],"name":"getReview","outputs":[{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"jobID","type":"uint256"}],"name":"getJobReviews","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_reviewee","type":"address"},{"name":"_jobID","type":"uint256"},{"name":"_reviewText","type":"string"},{"name":"_stars","type":"uint256"}],"name":"postReview","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"allReviews","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]



// ROPSTEN
/*
Replacing Migrations...
... 0xd3003e2e6785f1633502ac724922b5279f71f9d399e17a2d0fe044ef2550c9cd
Migrations: 0x2e7a768dfc12b56d3bd51883ef78511e3bc11e7e
Saving successful migration to network...
... 0x5a826133a78791285ea4fccfb0db0799972e434a7c22a93dab07be3b6de197bb
Saving artifacts...
Running migration: 2_deploy_contracts.js
Replacing JobPost...
... 0xe68ca31c2848bf2dd7989978319b094b876f68b568b6ba4010a119fd23c074ac
JobPost: 0x5a9c78d81cd4dee83a30c85e70e6fce861473971
Replacing Accounts...
... 0xe4698d6df2de334533810ad38fe6aa97c8fa2e8a30545fe1d06820c5c368730e
Accounts: 0x7e9f21da9987f9f2a40df638a8d278ac58224654
Saving successful migration to network...
... 0x59ff105e5485691e2725b172e5924608f7a6a98f5a05709e080c4e6566b56850
*/
