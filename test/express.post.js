let Express = require('express')
let request = require('../index');
let assert = require('assert');
let bodyParser = require('body-parser')

const app = Express();
const port = 3006;

let server;


describe('/POST-Express', function() {
	before(function() {
		server = app.listen(port, () => {
			app.use(bodyParser.json())
			app.use(bodyParser.urlencoded({ extended: false }))
			console.log("Test are running on port : " + port);
			app.post("/", function(req, res) {
				res.append('Content-Type', 'text/html');
				res.append('authorization', req.headers.authorization || "");
				res.send(req.body)
			})

		});
	});


	describe('/', function() {
		it('should return 200', function(done) {
			request.post('http://localhost:3006/', function(err, data, status) {
				assert.ifError(err);
				assert.equal(200, status);
				done();
			});
		});

		it('should say "Hello, world!" inside a JSON object', function(done) {
			request.post("http://localhost:3006", { hello: 'Hello, world!' }, {"content-type": "application/json"}, function(err, data) {
				assert.ifError(err);
				assert.deepEqual({ hello: 'Hello, world!' }, JSON.parse(data));
				done();
			});
		});

		it("should have content-type to 'text/html'", function(done) {
			request.post("http://localhost:3006", function(err, data, status, headers) {
				assert.ifError(err);
				assert.equal('text/html; charset=utf-8', headers['content-type']);
				done();
			});
		});

	});

	after(function() {
		server.close();
	});
});

