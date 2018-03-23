const puppeteer = require("puppeteer");

let convertHTMLToPDF = async (html, callback, options = null) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  if (!options) {
    options = { format: "letter" };
  }
  console.log(html)
  await page.setContent(html);
  await page.pdf({ format: "letter" }).then(callback);
  await browser.close();
}

module.exports = convertHTMLToPDF;
