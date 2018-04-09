// content of index.js
const http				= require('http');
const fs				= require('fs');
const port				= 3000;


// Get the URI - has its own function to allow recursivity
function deliverURI(uri, res) {
	// Try accessing the file
	fs.readFile(uri, (err, contents) => {
		if (err) {
			// Test if the url was requested of a root directory and populate a default index file if it was
			if ((uri[uri.length-1]) == '/') {
				try {
					var tmpUri = uri + 'index.html';
					fs.accessSync(tmpUri);
					uri = tmpUri;
				} catch (e) {
					try {
						console.log('Could not find file ' + tmpUri);
						var tmpUri = uri + 'index';
						fs.accessSync(tmpUri);
						uri = tmpUri;
					} catch (e) {
						res.statusCode = 404;
						res.end('Bad request\nNo file given or file not found!');
					}
				}
				deliverURI(uri, res);
			}
		} else {
			res.statusCode = 200;
			res.end(contents);
		}
	})
}

// Callback that handles the request and serves the response
const requestHandler = (req, res) => {
	var fullURI = '.' + req.url;
	console.log(`Request was made for ${fullURI}`)

	deliverURI(fullURI, res);
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
	if (err) {
		return console.log('something bad happened', err);
	}

	console.log(`server is listening on ${port}`);
})
