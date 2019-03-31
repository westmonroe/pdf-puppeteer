const express = require('express'),
    bodyParser = require('body-parser'),
    http = require('http'),
    convertHTMLToPDF = require('pdf-puppeteer');

const app = express();
const router = express.Router();

// prevent cors issue for the test html by file ref
// don't use in production
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With,[content-type]'
    );
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Example PDF route, can be used with the postman profile
// to test different option configurations, for example:
// changing the remoteContent option to false will allow the "GiantPDF"
// to load faster, but without the remote images.
router.route('/pdf').post(async function(req, res) {
    // to download to loacl filesystem with custom name pass a
    // "path" option. see the page.pdf docs for more info
    // https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagepdfoptions
    convertHTMLToPDF(
        req.body,
        pdf => {
            res.setHeader('Content-Type', 'application/pdf');
            res.send(pdf);
        },
        null,
        null,
        true
    ).catch(err => {
        console.log(err);
        res.status(500).send(err);
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
