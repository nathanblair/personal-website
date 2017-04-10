const fs 						= require('fs');
const sg						= require('./modules/SG.js');
const cwd						= process.cwd();
var categories 					= ['tech', 'personal'];


var blogPreviews				= [];


// Main call for module functionality
function GenerateStaticSite(categories) {
	// Clear the current featured and regular articles to make way for new content
	sg.ClearArticles();

	// Iterate through possible categories
	for (cat = 0; cat <= categories.length - 1; cat++) {
		// For the current iteration, store a testable directory
		const fileCat = 'blog/' + categories[cat];
		// Get the files/folders in the testable directory
		fs.readdir( fileCat, (err, foundFile) => {
			// Make sure no error occurred
			if (err) { console.log (err.message);  }
			// As long as no error occurred...
			else {
				// Iterate through each file found in the directory
				foundFile.forEach( (entry, ind) => {
					// Local save of the full file directory
					var filePath = fileCat + '/' + entry;
					// Test the file...
					fs.stat(filePath, (err, fileStats) => {
						// If there was an error in testing the file
						if (err) { console.log(err.message); }
						// Otherwise...
						else {
							// Check that the file found is actually a directory
							if (fileStats.isDirectory()) {
								// Local save of the full file name
								var fileName = filePath + '/index.html';
								// Attempt to read the file
								fs.readFile(fileName, 'utf8', (err, contents) => {
									// Check that no error was made in reading the file
									if (err) { console.log('An error occurred reading file: ' + fileName); }
									// Otherwise...
									else {
										// Call to write the articles for that file
										blogPreviews[cat] = sg.GetBlogPreview(fileName, contents, categories[cat]);
									}
								})
							}
						}
					})
				})
			}
		})
	}
}

GenerateStaticSite(categories);
