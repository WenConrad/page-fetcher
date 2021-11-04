const request = require('request');
const fs = require('fs');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
const URL = process.argv.slice(2, 3).toString();
const localFilePath = process.argv.slice(3, 4).toString();


request(URL, (error, response, body) => {
  if (response.statusCode !== 200) {
    throw error
  }
  fs.exists(localFilePath, function (isExist) {
    if (!isExist) {
      fs.writeFile(localFilePath, body, (err) => {
        if (err) throw err
        console.log('File written.');
      })
    } else {
      readline.question("File already exists. Enter [y] to overwrite.\n", (ans) => {
        if (ans === "y") {
          fs.writeFile(localFilePath, body, (err) => {
            if (err) throw err
            console.log('File overwritten.');
            readline.close();
          })
        }
      })
    }
  });
});
