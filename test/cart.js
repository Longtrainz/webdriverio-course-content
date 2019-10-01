
describe("Cart Functionality", function () {
    var btn = "#buyNowButton";
    var qty = "#qty";

    // Go to the product page
    beforeEach(function() {
        browser.url('/product-page.html');
    });

    it ("should only let you buy after setting quantity", function () {
        // Verify 'Buy Now' button is initially disabled
        var isBtnEnabled = browser.isEnabled(btn);
        expect(isBtnEnabled, "'buy now' button should be disabled to begin").to.be.false;

        // Add qty
        browser.setValue(qty, 10);

        // Verify 'Buy Now' button is enabled after entering quantity
        isBtnEnabled = browser.isEnabled(btn);
        expect(isBtnEnabled, "'buy now' button is now enabled").to.be.true;
    });

    describe("checkout process", function () {
        beforeEach(function() {
             // Add qty
            browser.setValue(qty, 10);

            // Click 'Buy Now' button
            browser.click(btn);
        });

        it("should disable 'Buy Now' button during processing", function () {
            // Verify 'Buy Now' button is disabled
            var isBtnEnabled = browser.isEnabled(btn);
            expect(isBtnEnabled, "'buy now' button should be disabled after clicking").to.be.false;

            // Verity button text is changed from 'Buy Now' to 'Purchasing'
            var btnText = browser.getText(btn);
            expect(btnText, "Verify 'buy now' test has changed").to.contain("Purchasing");
        });

        it("should show thank you message with qty and type", function () {
            // Verify thank you message is shown
            var thankYou = ".callout*=Thank you human";
            // Alternative with XPath
            // var thankYou =  "//div[@class='callout' and contains(text(),'Thank you')]";

            // waitForExist "thank you message"
            browser.waitForExist(thankYou, 3000);

            // verify it has properly qty and type
            var thankText = browser.getText(thankYou);
            expect(thankText).to.contain("10 T-800 Model 101");
        });

        it("should clear input after completion", function () {
            // Verify 'Quantity' input is cleared
            browser.waitForValue(qty, 3000, true);
        });

        it("should reset button text after purchase completes", function () {
            // Wait for button to return back to 'buy now'
            browser.waitUntil(function () {
                return browser.getText(btn) !== 'Purchasing...';
            }, 3000);

            var btnText = browser.getText(btn);
            expect(btnText).to.equal('Buy Now');
        });

        it("should hide thank you message after clicking close button", function () {
            var thankYou = ".callout*=Thank you human";
            
            // Verify thank you message is shown
            browser.waitForExist(thankYou, 3000);

            // Close thank you message
            browser.click(".close-button");

            // Verify thank you message is not shown - use "reverse" flag to wait for it to disappear
            browser.waitForVisible(thankYou, 3000, true);
        });
    });
});