var assert = require("assert");

describe('Shop CTA Button', function () {
  it('should link to the product page', function () {
     browser.url('./');

    var title = browser.getTitle();
    assert.equal(title, 'Robot Parts Emporium');

    browser.click('.shop-callout a');

    var productTitle = browser.getTitle()
    assert.equal(productTitle, 'Totally Not Evil Sentient Robot - Robot Parts Emporium');

    var url = browser.getUrl();
    var containsFile = url.includes('product-page.html');
    assert.ok(containsFile, 'URL mismatch'); // assert.ok = check value is truthy
  })
})
