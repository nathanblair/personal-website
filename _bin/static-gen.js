const fs 						= require('fs');
const pth						= require('path');
const sg						= require('./modules/SG.js');
const cwd						= process.cwd();
var categories 					= ['tech', 'personal'];

var blogPreviews				= [];


function TestAndExtractFile_Async(err, fileStats) {
	// If there was an error in testing the file
	if( err ) { console.log( err.message ); } else {
		// Check that the file found is actually a directory
		if( fileStats.isDirectory() ) {
			// Local save of the full file name
			var fileName = pth.join( filePath, 'index.html' );
			// Attempt to read the file
			fs.readFile( fileName, 'utf8', ( err, contents ) => {
				// Check that no error was made in reading the file
				if( err ) { console.log( err.message ); } else {
					// Call to write the articles for that file
					blogPreviews[fileName] = sg.GetBlogPreview( fileName, contents, categories[cat] );
				}
			})
		}
	}
}

// Main call for module functionality
function WalkBlogDirectory( categories ) {
	// Iterate through possible categories
	for( cat = 0; cat <= categories.length - 1; cat++ ) {
		// For the current iteration, store a testable directory
		var fileCat = pth.join( 'blog', categories[cat] );

		// Get the files/folders in the testable directory
		fs.readdirSync( fileCat ).forEach( function CheckBlog(entry, ind) {
			console.log(entry);
			// Local save of the full file directory
			var filePath = pth.join( fileCat, entry );
			fs.stat( filePath, TestAndExtractFile_Async ); 
		});
	}
}

WalkBlogDirectory( categories );
