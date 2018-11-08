const puppeteer = require('puppeteer');

let convertHTMLToPDF = async (html, callback, options = null, puppeteerArgs=null) => {
    if (typeof html !== 'string') {
        throw new Error(
            'Invalid Argument: HTML expected as type of string and received a value of a different type. Check your request body and request headers.'
        );
	}
	let browser;
	if (puppeteerArgs) {
		browser = await puppeteer.launch(puppeteerArgs);
	} else {
		browser = await puppeteer.launch();
	}

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
        request.respond({ body: html, contentType: 'text/html; charset=UTF-8' });
        page.on('request', request => request.continue());
    });
    await page.goto('https://google.com');

    await page.pdf(options).then(callback, function(error) {
        console.log(error);
    });
    await browser.close();
};

module.exports = convertHTMLToPDF;
