const express = require('express'),
    puppeteer = require('puppeteer'),
    bodyParser = require('body-parser'),
    http = require('http'),
    convertHTMLToPDF = require('pdf-puppeteer');

const app = express();
const router = express.Router();

// Example PDF route, can be used with the postman profile
// to test different option configurations, for example:
// changing the remoteContent option to false will allow the "GiantPDF"
// to load faster, but without the remote images.
router.route('/pdf').post(async function(req, res) {
    convertHTMLToPDF(req.body, pdf => {
        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdf);
    }, null, null, true).catch(err => {
        console.log(err);
        res.status(500).send('An error occurred');
    });
});

// Test route
router.route('/ping').get(async function(req, res) {
    res.send('Hello World');
});

app.use(
    bodyParser.text({
        limit: '50mb'
    })
);

app.use('/api', router);

// Start the server.
var port = 3000;
http.createServer(app).listen(port);
console.log('Server listening on port ' + port);
