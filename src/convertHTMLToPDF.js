const puppeteer = require('puppeteer');

let convertHTMLToPDF = async (html, callback, options = null, puppeteerArgs=null, remoteContent=false) => {
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
    
    if (remoteContent === true) {
        await page.goto(`data:text/html,${html}`, {
            waitUntil: 'networkidle0'
        });
    } else {
        //page.setContent will be faster than page.goto if html is a static
        await page.setContent(html);
    }
    
    await page.pdf(options).then(callback, function(error) {
        console.log(error);
    });
    await browser.close();
};

module.exports = convertHTMLToPDF;
