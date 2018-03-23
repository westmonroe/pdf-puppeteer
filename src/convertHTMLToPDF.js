const puppeteer = require('puppeteer');

async function convertHTMLToPDF (html, options=null) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    if (!options) {
        options = { format: 'letter' }; 
    }
    await page.setContent(html);
    await page.pdf(options)
    .then(function (pdf) {
        await browser.close();
        return pdf;
    });
}

export default convertHTMLToPDF;