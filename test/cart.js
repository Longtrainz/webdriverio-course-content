
var cart = require('./cart.page.js');
// var baseUrl = require('../wdio.conf.js').config.baseUrl;

describe("Cart Functionality", function () {
    // Go to the product page
    beforeEach(function() {
        browser.url('./product-page.html');
    });

    it("should only let you buy after setting quantity", function () {
        // console.log('BASE URL: ' + baseUrl);
        // Verify 'Buy Now' button is initially disabled
        var isBtnEnabled = cart.btn.isEnabled();
        expect(isBtnEnabled, "'buy now' button should be disabled to begin").to.be.false;

        // Add qty
        cart.qty.setValue(10);

        // Verify 'Buy Now' button is enabled after entering quantity
        isBtnEnabled = cart.btn.isEnabled();
        expect(isBtnEnabled, "'buy now' button is now enabled").to.be.true;
    });

    describe("checkout process", function () {
        beforeEach(function() {
             // Add qty
             cart.qty.setValue(10);

            // Click 'Buy Now' button
            cart.btn.click();
        });

        it("should disable 'Buy Now' button during processing", function () {
            // Verify 'Buy Now' button is disabled
            var isBtnEnabled = cart.btn.isEnabled();
            expect(isBtnEnabled, "'buy now' button should be disabled after clicking").to.be.false;

            // Verity button text is changed from 'Buy Now' to 'Purchasing'
            var btnText = cart.btn.getText();
            expect(btnText, "Verify 'buy now' test has changed").to.contain("Purchasing");
        });

        it("should show thank you message with qty and type", function () {
            // Verify thank you message is shown
            // Alternative with XPath
            // var thankYou =  "//div[@class='callout' and contains(text(),'Thank you')]";

            // waitForExist "thank you message"
            cart.thankYou.waitForExist(3000);

            // verify it has properly qty and type
            var thankText =  cart.thankYou.getText();
            expect(thankText).to.contain("10 T-800 Model 101");
        });

        it("should clear input after completion", function () {
            // Verify 'Quantity' input is cleared
            cart.qty.waitForValue(3000, true);
        });

        it("should reset button text after purchase completes", function () {
            // Wait for button to return back to 'buy now'
            browser.waitUntil(function () {
                return cart.btn.getText() !== 'Purchasing...';
            }, 3000);

            var btnText =  cart.btn.getText();
            expect(btnText).to.equal('Buy Now');
        });

        it("should hide thank you message after clicking close button", function () {
            // Verify thank you message is shown
            cart.thankYou.waitForExist();

            // Close thank you message
            $(".close-button").click();

            // Verify thank you message is not shown - use "reverse" flag to wait for it to disappear
            cart.thankYou.waitForVisible(3000, true);
        });
    });
});