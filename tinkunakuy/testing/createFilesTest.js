var fs = require('fs');

var encoding = 'utf8';
// Change the content of the file as you want
// or either set fileContent to null to create an empty file
var obj = {
    table: []
 };
 obj.table.push({id: 1, square:2});
var jsonContent = JSON.stringify(obj);

// The absolute path of the new file with its name
var filepath = "../data/firstJson.json";

//For creating and saving some data
fs.writeFile(filepath, jsonContent, (err) => {
    if (err) throw err;

    console.log("The file was succesfully saved!");
}); 
//For reading again and rewrite 
fs.readFile(filepath, encoding, function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
    obj = JSON.parse(data); //now it an object
    obj.table.push({id: 2, square:3}); //add some data
    json = JSON.stringify(obj); //convert it back to json
    fs.writeFile(filepath, json, 'utf8',(err) => {
        if (err) throw err;
        console.log("The file was succesfully saved!");
    }); // write it back 
}});