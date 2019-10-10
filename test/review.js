var request = require('sync-request');
var reviewForm = require('./reviewForm.page.js');
var Review = require('./Review.page.js');


describe("The product review form", function () {
    // Go to the product page
    beforeEach(function() {
        browser.url('/product-page.html');
    });

    it ("should add a review when submitted properly", function () {
        // Submit review
        reviewForm.submit("email@example.com", "This is the review");
        
        // Assert that our review now appears in the list
        var hasReview = browser.isExisting(".comment=This is the review");
        expect(hasReview, "comment text exists").to.be.true;
    });

    it ("should show an error if the input is wrong", function () {
        // Assert that error message is not showing to start
        var isErrorShowing = reviewForm.formError.isVisible();
        expect(isErrorShowing).to.be.false;

        // Submit form without entering content
        reviewForm.submit();
        
        // Assert that error message is now showing
        var isErrorShowing = reviewForm.formError.isVisible();
        expect(isErrorShowing).to.be.true;

    });

    it ("should hide the error message when input is corrected", function () {
         // Submit form without entering content
         reviewForm.submit();

         // Assert that error message is now showing
        var isErrorShowing = reviewForm.emailError.isVisible();
        expect(isErrorShowing).to.be.true;

        var isContentErrorShowing = reviewForm.reviewError.isVisible();
        expect(isContentErrorShowing).to.be.true;

        // Enter the email address
        reviewForm.submit("email@example.com");

         // Assert that error message is not showing
         var isErrorShowing = reviewForm.emailError.isVisible();
         expect(isErrorShowing).to.be.false;

         // Enter the comment
         reviewForm.submit("email@example.com", "valid");

         // Assert that error message is not showing
         var isMainErrorShowing = reviewForm.formError.isVisible();
         var isContentErrorShowing = reviewForm.reviewError.isVisible();
         
         expect(isMainErrorShowing).to.be.false;
         expect(isContentErrorShowing).to.be.false;
    });

    it("should focus on the first invalid input field on error", function () {
        // Verify focus is not set to 'Email Address' input initially
        var emailHasFocus = reviewForm.email.hasFocus();
        expect(emailHasFocus, "email should not have focus").to.be.false;

        // Submit form 
        reviewForm.submit();

         // Verify focus is set to 'Email Address' input
         emailHasFocus = reviewForm.email.hasFocus();
         expect(emailHasFocus, "email should not have focus").to.be.true;

         // Enter the email address
         reviewForm.submit("email@example.com");


        // Verify focus is set to 'Product is' input
        var contentHasFocus = reviewForm.content.hasFocus();
        expect(contentHasFocus, "review content field should not have focus").to.be.true;
    })

    it("should allow multiple reviews", function () {
       var res = request('GET','https://jsonplaceholder.typicode.com/posts/1/comments');

       var comments = JSON.parse(res.getBody().toString('utf8'));

        for (var i = 0; i < 10; i++) {
            reviewForm.submit(comments[i].email, comments[i].name);
            var review = new Review(i + 3);

            var email = review.email.getText();
            expect(email).to.equal(comments[i].email);

            var reviewText = review.comment.getText();
            expect(reviewText).to.equal(comments[i].name);
        }

    //     comments.forEach(function (comment, idx) {
    //         reviewForm.submit(comment.email, comment.name);
    //         var review = new Review(idx + 3);

    //         var email = review.email.getText();
    //         expect(email).to.equal(comment.email);

    //         var reviewText = review.comment.getText();
    //         expect(reviewText).to.equal(comment.name);
    //    })
    })

});