require("chai").should();

describe('Shop CTA Button', function () {
  it.skip('should link to the product page', function () {
     browser.url('./');

    var title = browser.getTitle();
    title.should.equal('Robot Parts Emporium');
  
    browser.click('.shop-callout a');

    var productTitle = browser.getTitle()
   productTitle.should.equal('Totally Not Evil Sentient Robot - Robot Parts Emporium');

    var url = browser.getUrl();
    url.should.include('product-page.html', 'URL mismatch');

  })
})
