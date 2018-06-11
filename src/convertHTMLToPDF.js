const puppeteer = require('puppeteer');

let convertHTMLToPDF = async (html, callback, options = null) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    if (!options) {
        options = { format: 'Letter' };
    }
    await page.goto(`data:text/html,${html}`, { waitUntil: 'networkidle0' });
    await page.pdf(options).then(callback, function(error) {
        console.log(error);
    });
    await browser.close();
};

module.exports = convertHTMLToPDF;
