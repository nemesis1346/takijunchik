'use strict'
//TODO: This class needs to be adequated to the main index.js otherwise is making noise
//Imports
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const fs = require('fs');
const port = 8810;
const app = express();

const handler = async (request, response) => {
    const file = '/home/nemesis1346/Documents/UniversityProjects/takijunchik/tinkunakuy/soundProcessing/41-Elicitations-2010.mp3';
    const stat = fs.statSync(file);
    const total = stat.size;
    console.log(request.headers);
    if (request.headers.range) {
        fs.exists(file, (exists) => {
            if (exists) {
                const range = request.headers.range;
                const parts = range.replace('/bytes=/', '').split('-');
                const partialStart = parts[0];
                const partialEnd = parts[1];

                const start = parseInt(partialStart, 10);
                const end = partialEnd ? parseInt(partialEnd, 10) : total - 1;
                const chunksize = (end - start) + 1;
                const rstream = fs.createReadStream(file, { start: start, end: end });

                response.writeHead(206, {
                    'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
                    'Accept-Ranges': 'bytes', 'Content-Length': chunksize,
                    'Content-Type': 'audio/mpeg'
                });
                rstream.pipe(res);

            } else {
                response.send('Error - 404');
                response.end();
                // res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'audio/mpeg' });
                // fs.createReadStream(path).pipe(res);
            }
        });
    }else{
        response.writeHead(200, { 'Content-Length': total, 'Content-Type': 'audio/mpeg' });
        fs.createReadStream(file).pipe(request);
    }
}

app.post('/streamTrack', handler);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.listen(port, async (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    try {

        // setTimeout(clientTest, 1500);
    } catch (error) {
        console.log("Error Composer instance: ", error);
    }
    console.log('server is listening on: ', port);
});