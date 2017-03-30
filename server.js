// content of index.js
const http		= require('http')
const fileSys	= require('fs')
const port		= 3000
const path		= 'C:/Users/nathan/Documents/Github/nathanblair.github.io'


// Get the URI
function deliverURI(uri, res) {
	// Try accessing the file
	fileSys.readFile(uri, (err, contents) => {
		if (err) {
			// Test if the url was requested of a root directory and populate a default index file if it was
			if ((uri[uri.length-1]) == '/') {
				try {
					fileSys.accessSync(uri + 'index.html')
					uri = uri + 'index.html'
				} catch (e) { 
					try {
						fileSys.accessSync(uri + 'index')
						uri = uri + 'index'
					} catch (e) {
						res.statusCode = 404
						res.end('Bad request\nNo file given or file not found!')
					}
				}
				deliverURI(uri, res)
			}
		} else {
			console.log('Delivered: ' + uri)
			res.statusCode = 200
			res.end(contents)
		}
	})
}

// Callback that handles the request and serves the response
const requestHandler = (req, res) => {	
	var fullURI = path + req.url
	console.log(`Request was made for ${req.url}`)

	deliverURI(fullURI, res)
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
	if (err) {
		return console.log('something bad happened', err)
	}

	console.log(`server is listening on ${port}`)
})