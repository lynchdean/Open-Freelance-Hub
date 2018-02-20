var Review = artifacts.require("./Review.sol");

var jobID = 123;
var reviewText = "Grand Job";
var stars = 5;
var reviewID = 0;

contract('Review', function(accounts) {
    it("should post a review", function() {
        return Review.deployed().then(function(instance) {
            deployedReview = instance;
            return deployedReview.postReview(accounts[1], jobID, reviewText, stars, {from: accounts[0]});
        }).then(function(postedReview) {
            return deployedReview.getReview.call(0);
        }).then(function(retrievedReview){
            assert.equal(retrievedReview[0], accounts[1], "The returned reviewee address is different");
            assert.equal(retrievedReview[1], jobID, "The returned job ID is wrong");
            assert.equal(web3.toAscii(retrievedReview[2]).replace(/\u0000/g, ''), reviewText, "The review text is different");
            assert.equal(retrievedReview[3], stars, "The stars are different");
            assert.equal(retrievedReview[4].toNumber(), reviewID, "The reviewID is wrong");
            assert.equal(retrievedReview[5], accounts[0], "The returned sender address is different");
        })
    })
})
