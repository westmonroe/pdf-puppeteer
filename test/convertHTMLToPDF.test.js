const convertHTMLToPDF = require('../src/convertHTMLToPDF');
const index = require('../index');
//const buffer = require('./bin/buffer');
const template = require('./bin/template');

// somewhat silly test to test the export and for code coverage
test('Index includes convertHTMLToPDF', () => {
    expect(typeof index).toBe('function');
});

// Loose check that this is not erroring, basically
// TODO find way to compare values of PDF's generated with returned array buffer
test('Converts HTML To PDF', done => {
    convertHTMLToPDF(template, pdf => {
        expect(Object.prototype.toString.call(pdf)).toBe('[object Uint8Array]');
        done();
    });
});


test('Converts HTML To PDF with Puppeteer Arguments', done => {
    convertHTMLToPDF(template, pdf => {
        expect(Object.prototype.toString.call(pdf)).toBe('[object Uint8Array]');
        done();
    }, {format: 'A4'}, {
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    });
});