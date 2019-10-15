describe('Main Menu', function() {
    it('should open on click', function() {
       browser.url('./');

       browser.click('*=Our Products');

       var results = browser.checkViewport({
           hide: ['.orbit']
       });

       expect(results[0].isWithinMisMatchTolerance).to.be.true;
    })
  })