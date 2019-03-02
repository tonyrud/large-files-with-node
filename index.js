const fs = require('fs');
const readline = require('readline');

const { logPercentage } = require('./logger');

const { log, time, timeEnd } = console;
time('Runtime');

const filePath = 'files/itcont_2018_20070823_20170529.txt';
const instream = fs.createReadStream(filePath);
const logger = logPercentage(filePath);
const outstream = fs.createWriteStream('output-2');
const rl = readline.createInterface(instream);

let lineCount = 0;
let allNames = [];

let allDates = [];
let dateDonations = [];

let firstNames = [];
let mostCommonName;

time('FileStream');
time('Readlines');

instream.on('data', logger);

rl.on('line', line => {
    lineCount++;
    const currentName = line.split('|')[7];
    allNames.push(currentName);

    const firstName = currentName[1];

    firstName && firstNames.push(firstName.trim());

    const date = line.split('|')[4].slice(0, 6);

    allDates.push(`${date.slice(0, 4)}-${date.slice(4)}`);
});

rl.on('close', line => {
    timeEnd('Readlines');
    process.stdout.clearLine();
    timeEnd('FileStream');
    // const namesObject = firstNames.reduce(objWithTotals, {});

    // mostCommonName = Object.entries(namesObject).reduce(
    //     (currentObj, [name, count]) =>
    //         currentObj.count > count ? currentObj : { name, count },
    //     {}
    // );

    // const datesObject = allDates.reduce(objWithTotals, {});

    // dateDonations = Object.entries(datesObject);

    // logStuff();
    timeEnd('Runtime');
});

const objWithTotals = (obj, name) => {
    obj[name] = (obj[name] || 0) + 1;
    return obj;
};

function logStuff() {
    log('total line count: ', lineCount);
    log('name 432: ', allNames[432]);
    log('name 43243: ', allNames[43243]);

    log(
        `The name "${mostCommonName.name}" is the most used, with a count of ${
            mostCommonName.count
        }`
    );

    // dateDonations.forEach(date => log(date));
    log('dates: ', JSON.stringify(dateDonations));
}
