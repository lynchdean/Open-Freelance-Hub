pragma solidity ^0.4.18;

contract Reviews {
    struct Review {
        address reviewee;
        uint jobID;
        string reviewText;
        uint stars;
        uint reviewID;
        address reviewer;
    }

    uint reviewCounter = 0;
    mapping (uint => Review) reviews;
    mapping (uint => uint[]) jobReviews;
    mapping (address => uint[]) reviewsSent;
    mapping (address => uint[]) reviewsReceived;
    uint[] public allReviews;

    function postReview(address _reviewee, uint _jobID, string _reviewText, uint _stars) public {
        var review = reviews[reviewCounter];

        review.reviewee = _reviewee;
        review.jobID = _jobID;
        review.reviewText = _reviewText;
        review.stars = _stars;
        review.reviewID = reviewCounter;
        review.reviewer = msg.sender;

        allReviews.push(review.reviewID);
        jobReviews[review.jobID].push(review.reviewID);
        reviewsSent[msg.sender].push(review.reviewID);
        reviewsReceived[review.reviewee].push(review.reviewID);

        reviewCounter += 1;
    }

    function getReview(uint reviewID) public constant returns (address, uint, string, uint, uint, address) {
        return (reviews[reviewID].reviewee, reviews[reviewID].jobID, reviews[reviewID].reviewText, reviews[reviewID].stars, reviews[reviewID].reviewID, reviews[reviewID].reviewer);
    }

    function getReceivedReviews(address addr) public constant returns (uint[]) {
        return reviewsReceived[addr];
    }

    function getSentReviews(address addr) public constant returns (uint[]) {
        return reviewsSent[addr];
    }

    function getJobReviews(uint jobID) public constant returns (uint[]) {
        return jobReviews[jobID];
    }

    function getReviewCount() public constant returns (uint) {
        return reviewCounter;
    }
}
