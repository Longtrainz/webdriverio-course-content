describe('Shop CTA Button', function () {
  it.skip('should link to the product page', function () {
     browser.url('./');

    var title = browser.getTitle();
    console.log('Title is: ' + title);

    browser.click('.shop-callout a');

    var productTitle = browser.getTitle()
    console.log('Title is: ' + productTitle);

    var url = browser.getUrl();
    console.log('URL is: ' + url);
  })
})
