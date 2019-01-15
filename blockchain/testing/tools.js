function parseContent(content) {
    let entireContent = content;
    let arrayContent = entireContent.split(" ");
    let finalResult = [];

    //Processing for the entire sentence
    for (let index = 0; index <= entireContent.length; index++) {
        for (let j = index; j <= entireContent.length; j++) {
            const currentResult = entireContent.slice(index, j).trim();
            if (currentResult) {
                finalResult.push(currentResult);
            }
        }
    }

    finalResult = removeDuplicates(finalResult);
    console.log(finalResult.length);
}

function removeDuplicates(arr){
    let unique_array = []
    for(let i = 0;i < arr.length; i++){
        if(unique_array.indexOf(arr[i]) == -1){
            unique_array.push(arr[i])
        }
    }
    return unique_array
}

parseContent('This is a tool');

const dupObj = [{ objectId: 1, value: 'a' }, { objectId: 2, value: 'b' }, { objectId: 1, value: 'c' }];

const uniKeys = [...(new Set(dupObj.map(({ objectId }) => objectId)))];
console.log(uniKeys);