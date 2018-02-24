// initialising web3 provider, or connecting to established provider
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

var reviewInstance = web3.eth.contract(ReviewAbi).at(ReviewAddr);
var jobPostInstance = web3.eth.contract(JobPostAbi).at(JobPostAddr);

function starRating(n) {
    document.getElementById("starRating").innerHTML = n;
}

function postReview(jobId) {
    var url = (window.location.href).split("?");
    var jobId = parseInt(url[1]);

    jobPostInstance.getWorker.call(jobId, (err, res) => {
        if (!err){
            var reviewee = res;
        } else {
            console.log("Could not retrieve reviewee");
        }
    });

    var reviewText = document.getElementById('reviewTextInput');
    var stars = document.getElementById('starRating');

    reviewInstance.postReview(reviewee, jobId, reviewText, stars, (err, res) => {
        if (!err) {
            console.log("Review successfully posted.");
        } else {
            console.log("Review post failed.");
        }
    });
}
