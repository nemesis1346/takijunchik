module.exports = {
    //  MORE EFFICIENT, BUT LESS FUN
    /**
     * @description Remove duplicates from an array of objects in javascript
     * @param arr - Array of objects
     * @param prop - Property of each object to compare
     * @returns {Array}
     */
    removeDuplicatesProp(arr, prop) {
        let obj = {};
        return Object.keys(
            arr.reduce((prev, next) => {
                if (!obj[next[prop]]) obj[next[prop]] = next;
                return obj;
            }, obj)
        ).map(i => obj[i]);
    },

    parseContent(content) {
        // console.log(content);
        let entireContent = content;
        let finalResult = [];

        //Processing for the entire sentence
        for (let index = 0; index <= entireContent.length; index++) {
            for (let j = index; j <= entireContent.length; j++) {
                const currentResult = entireContent.slice(index, j).trim();
                if (currentResult) {
                    finalResult.push(currentResult.toLowerCase());
                }
            }
        }
        finalResult = this.removeDuplicates(finalResult);
        return finalResult;
    },
    
    /**
     * @description Remove duplicates
     */
    removeDuplicates(arr) {
        let unique_array = [];
        for (let i = 0; i < arr.length; i++) {
            if (unique_array.indexOf(arr[i]) == -1) {
                unique_array.push(arr[i]);
            }
        }
        return unique_array;
    },
    removeDuplicates2(myArr, prop) {
        return myArr.filter((obj, pos, arr) => {
            return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
        });
    },


    /**
     * @description this is a function for parsing the format of the time.
     * @param {*} duration
     */
    parseTimeFormat(duration) {
        var milliseconds = parseInt((duration % 1000) / 100),
            seconds = parseInt((duration / 1000) % 60),
            minutes = parseInt((duration / (1000 * 60)) % 60),
            hours = parseInt((duration / (1000 * 60 * 60)) % 24);

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        return minutes + ":" + seconds + "." + milliseconds;
    },


    /**
     * @description this is a function for parsing the format of the time.
     * @param {*} duration 
     */
    parseTimeFormatForRawProcessor(duration) {
        var milliseconds = parseInt((duration%1000)/100)
            , seconds = parseInt((duration/1000)%60)
            , minutes = parseInt((duration/(1000*60))%60)
            , hours = parseInt((duration/(1000*60*60))%24);
    
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
    
        return "[" +minutes + ":" + seconds + "." + milliseconds+"][";
    },
    /**
     * This method is for testing the splitting 
     */
    async  divideMP3() {
        try {
            let options = { input: './41-Elicitations-2010.mp3', 
            sections: ['[00:00] audio1','[10:00] audio2'] ,
        output:'.'};
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
}