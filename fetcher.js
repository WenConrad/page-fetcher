const request = require('request');
const fs = require('fs');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
const URL = process.argv.slice(2, 3).toString();
const localFilePath = process.argv.slice(3, 4).toString();

const writeToFile = (path, data) => {
  fs.writeFile(path, data, (err) => {
    if (err) throw err;
    console.log(`Downloaded and saved ${data.length} bytes to ${path}`);
  })
};

request(URL, (error, response, body) => {
  if (response.statusCode !== 200) {
    throw Error(`Error ${response.statusCode}`);
  }
  fs.exists(localFilePath, (isExist) => {
    if (isExist) {
      readline.question("File already exists. Overwrite? [Y/N]\n", (ans) => {
        if (ans !== "y") {
          console.log("Operation aborted.");
          readline.close();
        } else {
          console.log("Overwriting file...")
          writeToFile(localFilePath, body);
          readline.close();
        }
      })
    } else {
    writeToFile(localFilePath, body);
    readline.close();
    }
  })
});