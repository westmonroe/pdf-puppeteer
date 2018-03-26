const convertHTMLToPDF = require('../src/convertHTMLToPDF');
const index = require('../index');
const exampleTemplate = require('./bin/example.html');

// somewhat silly test to test the export and for code coverage
test('Index includes convertHTMLToPDF', () => {
    expect(typeof index).toBe('function');
});

test('Converts HTML To PDF', () => {});

function testCallbackForConversion(pdf) {
    expect(pdf).toBe(true);
}
