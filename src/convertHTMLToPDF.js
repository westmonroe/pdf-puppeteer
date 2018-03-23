const puppeteer = require('puppeteer');

async function convertHTMLToPDF (html, callback, options=null) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    if (!options) {
        options = { format: 'letter' }; 
    }
    await page.setContent(html);
    await page.pdf({ format: 'letter' })
    .then(callback);
    await browser.close();
  }

export default convertHTMLToPDF;