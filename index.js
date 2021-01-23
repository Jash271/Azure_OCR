'use strict';
const request = require('request');
require('dotenv').config();
let subscriptionKey = process.env['COMPUTER_VISION_SUBSCRIPTION_KEY'];
let endpoint = process.env['COMPUTER_VISION_ENDPOINT'];
if (!subscriptionKey) {
  throw new Error(
    'Set your environment variables for your subscription key and endpoint.'
  );
}

var uriBase = endpoint + 'vision/v3.1/ocr';

const imageUrl =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/' +
  'Atomist_quote_from_Democritus.png/338px-Atomist_quote_from_Democritus.png';

// Request parameters.
const params = {
  language: 'unk',
  detectOrientation: 'true',
};

const options = {
  uri: uriBase,
  qs: params,
  body: '{"url": ' + '"' + imageUrl + '"}',
  headers: {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': subscriptionKey,
  },
};

request.post(options, (error, response, body) => {
  if (error) {
    console.log('Error: ', error);
    return;
  }
  let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
  const res = JSON.parse(jsonResponse);
  console.log(res.regions[0].lines);
  console.log(typeof res.regions[0].lines);
  let z = [];
  res.regions[0].lines.forEach((x) => {
    let p = '';
    console.log(x);
    x.words.forEach((y) => {
      p += ' ' + y.text;
    });

    z.push(p);
  });

  console.log(z.join('\n'));
});
