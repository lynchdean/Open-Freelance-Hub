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

function postReviewTest(reviewee, jobId) {
    var url = (window.location.href).split("?");
    var jobId = parseInt(url[1]);
    var reviewText = document.getElementById('reviewTextInput').value;
    var stars = document.getElementById('starRating').innerHTML;
    stars = parseInt(stars);

    console.log(reviewee);
    console.log(jobId);
    console.log(reviewText);
    console.log(stars);

    reviewInstance.postReview(reviewee, jobId, reviewText, stars, (err, res) => {
        if (!err) {
            console.log("Success");
        } else {
            console.log("Failure");
        }
    });
}
