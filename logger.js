const fs = require('fs');
const ProgressBar = require('progress');

const logPercentage = filePath => {
    const bar = new ProgressBar(
        '  downloading [:bar] :rate/bps :percent :etas',
        {
            complete: '=',
            incomplete: ' ',
            width: 20,
            total: fs.statSync(filePath).size,
        }
    );

    return chunk => {
        bar.tick(chunk.length);
    };
};

module.exports = {
    logPercentage,
};
