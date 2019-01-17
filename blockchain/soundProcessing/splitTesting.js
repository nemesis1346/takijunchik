'use strict'
const ffmpeg = require('ffmpeg');
const shell = require('shelljs');
const mp3Split = require('mp3-split');
/**
 * This method is for testing the splitting 
 */
async function divideMP3() {
    try {
        // shell.echo('Sorry, this script requires git');

        // if (!shell.which('git')) {
        //     shell.echo('Sorry, this script requires git');
        //     shell.exit(1);
        //   }
        //   shell.config(ffmpeg -i long.mp3 -acodec copy -ss 00:00:00 -t 00:30:00 half1.mp3);
        // var process = new ffmpeg('/home/nemesis1346/Documents/UniversityProjects/takijunchik/tinkunakuy/soundProcessing/41-Elicitations-2010.mp3');
        // process.then(function (video) {
        //     console.log('The video is ready to be processed');
        // }, function (err) {
        //     console.log('Error: ' + err);
        // });
        // let options = { input: '/home/nemesis1346/Documents/UniversityProjects/takijunchik/tinkunakuy/soundProcessing/41-Elicitations-2010.mp3', audios: ['[00:00] audio', '[00:02.5] audio2','[00:06.1] audio3'] };
        let options = { input: '/home/nemesis1346/Documents/UniversityProjects/takijunchik/blockchain/data/audioFiles/41-Elicitations-2010.mp3', 
        sections: ['[00:00] audio'] ,
    output:'.'};

    shell.exec('ffmpeg -i /home/nemesis1346/Documents/UniversityProjects/takijunchik/blockchain/data/audioFiles/41-Elicitations-2010.mp3 -acodec copy -ss 00:00:00 -t 00:30:00 half1.mp3');

        let split = mp3Split(options);
        split.parse().then((sections) => {
            for (let section of sections) {
                console.log(section.name);      // filename
                console.log(section.start);     // section start
                console.log(section.end);       // section end
                console.log(section.trackName); // track name
            }
        });

    } catch (e) {
        console.log(e);
        console.log(e.code);
        console.log(e.msg);
    }

}
// function parseTime(duration) {
//     var milliseconds = parseInt((duration % 1000) / 100)
//         , seconds = parseInt((duration / 1000) % 60)
//         , minutes = parseInt((duration / (1000 * 60)) % 60)
//         , hours = parseInt((duration / (1000 * 60 * 60)) % 24);

//     hours = (hours < 10) ? "0" + hours : hours;
//     minutes = (minutes < 10) ? "0" + minutes : minutes;
//     seconds = (seconds < 10) ? "0" + seconds : seconds;

//     return "[" + minutes + ":" + seconds + "." + milliseconds + "]";
// }
// console.log(parseTime('6173'));
divideMP3();