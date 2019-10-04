var request = require('sync-request');

browser.addCommand("submitReview", function (email, review) {
    if (email) {
        // Enter the email address
        browser.setValue("#review-email", email);
    }
    if (review) {
        // Enter text in a comment form
        browser.setValue("#review-content", review);
    }

    // Submit the review
    browser.submitForm("#review-content");
});

describe("The product review form", function () {
    // Go to the product page
    beforeEach(function() {
        browser.url('/product-page.html');
    });
    it ("should add a review when submitted properly", function () {
        // Submit review
        browser.submitReview("email@example.com", "This is the review");
        
        // Assert that our review now appears in the list
        var hasReview = browser.isExisting(".comment=This is the review");
        expect(hasReview, "comment text exists").to.be.true;
    });

    it ("should show an error if the input is wrong", function () {
        // Assert that error message is not showing to start
        var isErrorShowing = browser.isVisible("p=There are some errors in your review.")
        expect(isErrorShowing).to.be.false;

        // Submit form without entering content
        browser.submitReview();
        
        // Assert that error message is now showing
        var isErrorShowing = browser.isVisible("p=There are some errors in your review.")
        expect(isErrorShowing).to.be.true;

    });

    it ("should hide the error message when input is corrected", function () {
         // Submit form without entering content
         browser.submitReview();

         // Assert that error message is now showing
        var isErrorShowing = browser.isVisible("p=Please enter a valid email address.")
        expect(isErrorShowing).to.be.true;

        var isContentErrorShowing = browser.isVisible("p=A review without text isn't much of a review.")
        expect(isContentErrorShowing).to.be.true;

        // Enter the email address
        browser.submitReview("email@example.com");

         // Assert that error message is not showing
         var isErrorShowing = browser.isVisible("p=Please enter a valid email address.")
         expect(isErrorShowing).to.be.false;

         // Enter the comment
         browser.submitReview("email@example.com", "valid");

         // Assert that error message is not showing
         var isMainErrorShowing = browser.isVisible("p=There are some errors in your review.")
         var isContentErrorShowing = browser.isVisible("p=A review without text isn't much of a review.")
         
         expect(isMainErrorShowing).to.be.false;
         expect(isContentErrorShowing).to.be.false;
    });

    it("should focus on the first invalid input field on error", function () {
        // Verify focus is not set to 'Email Address' input initially
        var emailHasFocus = browser.hasFocus("#review-email");
        expect(emailHasFocus, "email should not have focus").to.be.false;

        // Submit form 
        browser.submitReview();

         // Verify focus is set to 'Email Address' input
         emailHasFocus = browser.hasFocus("#review-email");
         expect(emailHasFocus, "email should not have focus").to.be.true;

         // Enter the email address
        browser.submitReview("email@example.com");


        // Verify focus is set to 'Product is' input
        var contentHasFocus = browser.hasFocus("#review-content");
        expect(contentHasFocus, "review content field should not have focus").to.be.true;
    })

    it.only("should allow multiple reviews", function () {
       var res = request('GET','https://jsonplaceholder.typicode.com/posts/1/comments');

       var comments = JSON.parse(res.getBody().toString('utf8'));

       comments.forEach(function (comment, idx) {
           browser.submitReview(comment.email, comment.name);

           var email = browser.getText(".reviews > .comment:nth-of-type(" + (idx + 3) + ") .email");
           expect(email).to.equal(comment.email);

           var reviewText = browser.getText(".reviews > .comment:nth-of-type(" + (idx + 3) + ") .comment");
           expect(reviewText).to.equal(comment.name);
       })

    })

});