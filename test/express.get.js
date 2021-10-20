let Express = require('express')
let request = require('../index');
let assert = require('assert');

const app = Express();
const port = 3005;

let server;





describe('/GET-Express', function() {
	before(function() {
		server = app.listen(port, () => {
			''
			console.log("Test are running on port : " + port);
			app.get("/", function(req, res) {
				res.append('Content-Type', 'text/plain');
				res.append('authorization', req.headers.authorization || "");

				res.send("Hello, world!\n")
			})
		});
	});


	describe('/', function() {
		it('should return 200', function(done) {
			request.get('http://localhost:3005/?hey=d', function(err, data, status, headers) {
				assert.ifError(err);
				assert.equal(200, status);
				done();
			});
		});

		it('should say "Hello, world!"', function(done) {
			request.get("http://localhost:3005", function(err, data, status, headers) {
				assert.ifError(err);
				assert.equal('Hello, world!\n', data);
				done();
			});
		});

		it("should have content-type to 'text/plain'", function(done) {
			request.get("http://localhost:3005", function(err, data, status, headers) {
				assert.ifError(err);
				assert.equal('text/plain; charset=utf-8', headers['content-type']);
				done();
			});
		});

	});

	after(function () {
		server.close();
	});
});

