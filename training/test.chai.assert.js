var assert = require("chai").assert;

describe('Shop CTA Button', function () {
  it.skip('should link to the product page', function () {
     browser.url('./');

    var title = browser.getTitle();
    assert.equal(title, 'Robot Parts Emporium');

    browser.click('.shop-callout a');

    var productTitle = browser.getTitle()
    assert.equal(productTitle, 'Totally Not Evil Sentient Robot - Robot Parts Empsorium');

    // var url = browser.getUrl();
    assert.include(browser.getUrl(), 'product-page.html', 'URL mismatch');
    // var containsFile = url.includes('product-page.html');
    // assert.isOk(containsFile, 'URL mismatch'); // assert.ok = check value is truthy
  })
})
