# Native Request Light
[![npm version](https://badge.fury.io/js/native-request-light.svg)](https://badge.fury.io/js/native-request-light) ![npm](https://img.shields.io/npm/dm/native-request-light)


## Native Request Light is the Light version of the Native Request package. 
Native Request add features like cookies management or 300 redirects.. 
You can take a look here: https://github.com/ZaralDev/native-request/


Native Request [Light] is a simple module that makes you able to create native node.js requests supports https.

  - supports HTTPS
  - 0 dependencies
  - use callbacks




## Table of Contents  
[Installation](#installation)  
[Usage](#usage)



## Installation

Install the package with npm

```bash
npm install native-request-light
```

## Usage

### JSON request (recommended)
 - request.request(options, callback)

Easy

```js
let request = require('native-request-light');

request.request({
        url: "http://github.com/",
        method: 'POST',
    }, function(err, data, status, headers) {
        console.log(status); //200
        console.log(data); // page content
        console.log(headers); // response headers
});

```

Full
```js
let request = require('native-request-light');

request.request({
        url: "http://github.com/",
        method: 'POST',
        headers: {
            authorization: "Token121",
            "content-type": "application/json"
        }
    }, function(err, data, status, headers) {
        console.log(status); //200
        console.log(data); // page content
        console.log(headers); // response headers
});

```

#### Parameters
| Options | Required  | Type  | Parameters |  Default 
|:--|:--:|:--: |-- |:--: |
| url | ✓ | String |Target url | |
| method| ✓ | String|HTTP method to use. More info [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) | |
| Headers | | JSON Object | Pass headers to the request with a JSON format.  |  |




### GET request
 -  request.get(path, headers, callback)
 -  request.get(path, callback)



```js
let request = require('native-request-light');
request.get('https://github.com', function(err, data, status, headers) {
    if (err) {
        throw err;
    }
    console.log(status); //200
    console.log(data); // page content
    console.log(headers); // response headers
});
```
To add custom **headers** just do like this:
```js
let request = require('native-request-light');

let headers = {
    "content-type": "plain/text"
}
request.get('https://github.com', headers, function(err, data, status, headers) {
    if (err) {
        throw err;
    }
    console.log(status); //200
    console.log(data); // page content
    console.log(headers); // response headers
});
```
### POST request
 -  request.post(path, callback)
 -  request.post(path, data, callback)
 -  request.post(path, data, headers, callback)

 
To send an empty **post**:
```js
let request = require('native-request-light');
request.post('https://github.com', function(err, data, status, headers) {
    if (err) {
        throw err;
    }
    console.log(status); //200
    console.log(data); // page content
    console.log(headers); // response headers
});
```

With headers and data:

```js
let request = require('native-request-light');

let data = {
    "example": true,
}
let headers = {
    "content-type": "plain/text"
}
request.post('https://github.com', data, headers, function(err, data, status, headers) {
    if (err) {
        throw err;
    }
    console.log(status); //200
    console.log(data); // page content
    console.log(headers); // response headers
});
```


### License
MIT. Copyright (c) Samuel Marchese.
