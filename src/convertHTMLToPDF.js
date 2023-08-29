const puppeteer = require('puppeteer');

async function convertHTMLToPDF(html, callback, options = { format: 'Letter' }, puppeteerArgs = {}, remoteContent = true) {
    if (typeof html !== 'string') {
        throw new Error(
            'Invalid Argument: HTML expected as type of string and received a value of a different type. Check your request body and request headers.'
        );
    };

    const browser = await puppeteer.launch(puppeteerArgs);

    const page = await browser.newPage();

    page.setDefaultNavigationTimeout(0);

    if (remoteContent === true) {
        await page.goto(`data:text/html;base64,${Buffer.from(html).toString('base64')}`, {
            waitUntil: 'networkidle0'
        });
    } else {
        await page.setContent(html);
    };

    await page.pdf(options).then(callback, function (error) {
        console.log(error);
    });

    await browser.close();
}

module.exports = convertHTMLToPDF;
