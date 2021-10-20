const url = require('url');
const http = require('http');
const https = require('https');

function getProtocol(path) {
	return url.parse(path).protocol === "http:" ? http : https;
}

const Request = function() {

	let _options = {};
	let _parsedUrl;
	let _originalPath; //String
	let _postData; //String
	let _callback = ()=>{};

	this._handleResponse = function(response, callback) {
		let body = '';
		const status = response.statusCode;
		const hasError = status >= 300;
		response.setEncoding('utf8');
		response.on('data', function(data) {
			body += data;
		});
		response.on('end', () => {
			callback(hasError ? body : null, hasError ? null : body, response.statusCode, response.headers);
		});
	}

	this._parsePath = function(path) {
		if (!!_parsedUrl && !!path && path.indexOf('http') == -1) {
 			path = _parsedUrl.protocol + "//" + _parsedUrl.host + path;
		}
		_originalPath = path;
		_parsedUrl = url.parse(path);
		_options.hostname = _parsedUrl.hostname;
		_options.port = _parsedUrl.port;
		_options.path = _parsedUrl.pathname + (!!_parsedUrl.search ? _parsedUrl.search : '');
	}

	this.sendRequest = function() {

		const req = getProtocol(_originalPath).request(_options, (response) => {
			this._handleResponse(response, _callback);
		});
		req.on('error', function(error) {
			_callback(error);
		});
		// Write data to request body
		if (_options.method !== "GET")
			req.write(_postData);
		req.end();
	}

	/**
	 * Send a custom request
	 * @param path is the url endpoint
	 * @param headers of the request
	 * @param callback contains (error, statusCode, data)
	 * @param data a JSON Object or a string
	 * @param method is the protocol used like POST GET DELETE PUT etc...
	 */
	this.createRequest = function(path, method, data, headers = {}, callback) {
		if (typeof data === 'function') {
			callback = data;
			data = '';
		} else if (typeof headers === 'function') {
			callback = headers;
			headers = {};
		} 
		const postData = typeof data === "object" ? JSON.stringify(data) : data;
		_options = {
			method: method,
			headers: headers
		};

		this._parsePath(path);
		_postData = postData;
		
		_callback = callback;

	}
}

module.exports = Request;