# PDF-Puppeteer  
<!-- [START badges] -->
[![NPM Version](https://img.shields.io/npm/v/pdf-puppeteer.svg)](https://www.npmjs.com/package/pdf-puppeteer) [![Node Requirement](https://img.shields.io/node/v/pdf-puppeteer.svg)](https://www.npmjs.com/package/pdf-puppeteer) [![License](https://img.shields.io/npm/l/pdf-puppeteer.svg)](https://github.com/westmonroe/pdf-puppeteer/blob/master/LICENSE) [![Downloads/week](https://img.shields.io/npm/dm/pdf-puppeteer.svg)](https://www.npmjs.com/package/pdf-puppeteer) 
<!-- [END badges] -->
A simple npm package to convert HTML to PDF for Node.js applications by using Puppeteer   

## Getting Started  

### Installation  

To use PDF-Puppeteer in your Node app:  
 
```bash
npm install --save pdf-puppeteer   
# or "yarn add pdf-puppeteer"
```  

### Requirements
Node 7.6.0 or greater.

### Usage  

First, include the `convertHTMLToPDF` from the package in your .js file:  

```js
const convertHTMLToPDF = require("pdf-puppeteer");

var callback = function (pdf) {
    // do something with the PDF like send it as the response
    res.setHeader("Content-Type", "application/pdf");
    res.send(pdf);
}

/**
*    Usage
*    @param html - This is the html to be converted to a pdf
*    @param callback - Do something with the PDF
*    @param [options] - Optional parameter to pass in Puppeteer PDF options
*    @param [puppeteerArgs] - Optional parameter to pass in Puppeter arguments
*    @param [remoteContent] - Default true. Optional parameter to specify if there is no remote content. Performance will be opitmized for no remote content.
*/
convertHTMLToPDF(html, callback, options, puppeteerArgs, remoteContent);
```

The `convertHTMLToPDF` function takes the four parameters detailed above. For more information on the available Puppeteer options for PDF's take a look at [Puppeteer's Page PDF Options](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagepdfoptions). More details on usage can be found by checking out the example in the repo. In addition, flags for configuring how Puppeteer should be launched can be set by populating the `puppeteerArgs` parameter. Take a look at [Puppeteer's Launch Options](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions) for example arguments. 

### Example  

To run the example in the repo: clone the repo, npm install on the package, npm install on the example, and run the app:  
```bash
git clone https://github.com/westmonroe/pdf-puppeteer.git  
cd pdf-puppeteer
npm install
cd example
npm install
node index.js
```  
Once the example is running, the PDF route can be tested using Postman. In the example folder, you will find a Postman collection called `PDF-Puppeteer.postman_collection.json` with the test routes and test html included. 
