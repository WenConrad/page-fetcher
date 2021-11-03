const request = require('request');
const fs = require('fs');
const URL = process.argv.slice(2, 3);
const localFilePath = process.argv.slice(3, 4);

request('http://example.edu', (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  fs.writeFile('./example.html', body, function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
  });
});
