import fs from 'fs';
import readline from 'readline';
import stream from 'stream';

const filePath = 'files/itcont_2018_20070823_20170529.txt';
const instream = fs.createReadStream(filePath);
const outstream = new stream();
const rl = readline.createInterface(instream, outstream);

let lineCount = 0;
let allNames = [];

let allDates = [];
let dateDonations = [];

let firstNames = [];
let mostCommonName;

rl.on('line', line => {
    lineCount++;

    const currentName = splitAndGrabIndex(line, '|', 7);
    allNames.push(currentName);

    const firstName = splitAndGrabIndex(currentName, ', ', [1]);

    if (firstName) {
        firstName.trim();
        firstNames.push(firstName);
    }

    const date = line.split('|')[4].slice(0, 6);
    const year = date.slice(0, 4);
    const month = date.slice(4);
    const parsedDate = `${year}-${month}`;

    allDates.push(parsedDate);
});

rl.on('close', line => {
    const namesObject = firstNames.reduce(objWithTotals, {});

    mostCommonName = Object.entries(namesObject).reduce(
        (currentObj, [name, count]) =>
            currentObj.count > count ? currentObj : { name, count },
        {}
    );

    const datesObject = allDates.reduce(objWithTotals, {});

    dateDonations = Object.entries(datesObject);

    logStuff();
});

const splitAndGrabIndex = (str, splitOn, index) => str.split(splitOn)[index];

const objWithTotals = (obj, name) => {
    obj[name] = (obj[name] || 0) + 1;
    return obj;
};

function logStuff() {
    const { log } = console;

    log('total line count: ', lineCount);
    log('name 432: ', allNames[432]);
    log('name 43243: ', allNames[43243]);

    log(
        `The name "${mostCommonName.name}" is the most used, with a count of ${
            mostCommonName.count
        }`
    );

    dateDonations.forEach(date => log(date));
}
