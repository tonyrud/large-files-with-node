const fs = require('fs');

// let fileName = process.argv[2];
const fileName = 'files/itcont.txt';
let destPath = process.argv[3];

const readabale = fs.createReadStream(fileName);
const writeable = fs.createWriteStream(destPath || 'output.txt');

fs.stat(fileName, (err, stats) => {
    console.log('stats size: ', stats.size);
    this.fileSize = stats.size;
    this.counter = 1;
    this.fileArray = fileName.split('.');

    try {
        this.duplicate =
            destPath + '/' + this.fileArray[0] + '_Copy.' + this.fileArray[1];
    } catch (e) {
        console.exception('File name is invalid! please pass the proper one');
    }

    process.stdout.write(`File: ${this.duplicate} is being created:`);

    readabale.on('data', chunk => {
        let percentageCopied =
            ((chunk.length * this.counter) / this.fileSize) * 100;
        process.stdout.clearLine(); // clear current text
        process.stdout.cursorTo(0);
        process.stdout.write(`${Math.round(percentageCopied)}%`);
        this.counter += 1;
    });

    readabale.pipe(writeable); // Auto pilot ON!

    readabale.on('error', e => {
        console.log('Some error occured: ', e);
    });

    writeable.on('finish', () => {
        console.log('Successfully created the file copy!');
    });

    // In case if we have an interruption while copying
    // writeable.on('unpipe', e => {
    //     console.error('copy has failed', e);
    //     process.stdout.write('Copy has failed!');
    // });
});
