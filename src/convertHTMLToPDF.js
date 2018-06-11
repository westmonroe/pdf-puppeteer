const puppeteer = require('puppeteer');

let convertHTMLToPDF = async (html, callback, options = null) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    if (!options) {
        options = { format: 'Letter' };
    }
    
    // From https://github.com/GoogleChrome/puppeteer/issues/728#issuecomment-359047638
    // Using this method to preserve external resources while maximizing allowed size of pdf
    // Capture first request only
    await page.setRequestInterception(true);
    page.once('request', request => {
      // Fulfill request with HTML, and continue all subsequent requests
      request.respond({body: html});
      page.on('request', request => request.continue());
    });
    await page.goto('http://example.com');
    
    await page.pdf(options).then(callback, function(error) {
        console.log(error);
    });
    await browser.close();
};

module.exports = convertHTMLToPDF;
