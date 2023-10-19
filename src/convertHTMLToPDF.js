const puppeteer = require('puppeteer');

/**
 * Remark 1: if keepBrowserOpened is true, the caller is in charge of closing it calling convertHTMLToPDF.end()
 */
var g_puppeteerBrowser = null;
let convertHTMLToPDF = async (html, callback, options = null, puppeteerArgs=null, remoteContent=true, keepBrowserOpened=false) => {
    if (typeof html !== 'string') {
        throw new Error(
            'Invalid Argument: HTML expected as type of string and received a value of a different type. Check your request body and request headers.'
        );
	}
	let browser;
    if (keepBrowserOpened && g_puppeteerBrowser) {
        browser = g_puppeteerBrowser;
	} else if (puppeteerArgs) {
		browser = await puppeteer.launch(puppeteerArgs);
	} else {
		browser = await puppeteer.launch();
	}
    g_puppeteerBrowser = browser;

    const page = await browser.newPage();
    if (!options) {
        options = { format: 'Letter' };
    }

    if (remoteContent === true) {
        await page.goto(`data:text/html;base64,${Buffer.from(html).toString('base64')}`, {
            waitUntil: 'networkidle0'
        });
    } else {
        //page.setContent will be faster than page.goto if html is a static
        await page.setContent(html);
    }

    await page.pdf(options).then(callback, function(error) {
        console.log(error);
    });
    await (keepBrowserOpened ? page.close() : closeBrowser());

    return browser;
};
function closeBrowser() {
    g_puppeteerBrowser.close();
    g_puppeteerBrowser = null;
}
const pdfPuppeteerModule = module.exports = convertHTMLToPDF;
pdfPuppeteerModule.end = closeBrowser;
