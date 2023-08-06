const convertHTMLToPDF = require('../src/convertHTMLToPDF');
const index = require('../index');
//const buffer = require('./bin/buffer');
const template = require('./bin/template');
const remoteTemplate = require('./bin/remoteTemplate');

// somewhat silly test to test the export and for code coverage

describe('pdf-puppetter tests', () => {
    beforeEach(() => {
        jest.setTimeout(30000);
    });

    test('Index includes convertHTMLToPDF', () => {
        expect(typeof index).toBe('function');
    });
    
    // Loose check that this is not erroring, basically
    // TODO find way to compare values of PDF's generated with returned array buffer
    test('Converts static HTML To PDF', done => {
        convertHTMLToPDF(template, pdf => {
            expect(Object.prototype.toString.call(pdf)).toBe('[object Uint8Array]');
            done();
        }, null, null, false);
    });
    
    test('Converts remote HTML To PDF with Puppeteer Arguments', done => {
        convertHTMLToPDF(remoteTemplate, pdf => {
            expect(Object.prototype.toString.call(pdf)).toBe('[object Uint8Array]');
            done();
        }, {format: 'A4'}, {
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
        }, true);
    }, 10000);
    
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
});

