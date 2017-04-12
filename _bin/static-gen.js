const fs 						= require('fs');
const pth						= require('path');
const sg						= require('./modules/SG.js');
var categories 					= ['tech', 'personal'];

var blogFiles					= [];
var blogPreviews				= [];

var numArticles					= 0;
var blogsDone					= 0;


// Call the WalkDirectory with the appropriate arguments depending on the current path
function HandleDirectory(file, blogDir, inBlog) {
	// Call WalkDirectory on the current blogDir path knowing that the current path is a blog category directory
	if (categories.indexOf(file) >= 0) { WalkDirectory(blogDir, true); }
	// Call WalkDirectory on the current blogDir, but note that already in blog directory
	else if (inBlog) { WalkDirectory(blogDir, false); }
}


function HandleArticles(blogDir) {
	// Add the current blog file (blogDir) into the list of blogFiles
	blogFiles.push(blogDir);
	// Mark how many blog files have been pushed
	blogsDone = blogsDone + 1;
	// Handle end of sequence
	if (blogsDone == numArticles) {
		console.log("Blog Directory and Files Mapped!");
		// Stop the main feature process timer
		console.timeEnd("main");
	}
}


// From a fileStats object, check if the object represents the proper directory
function CheckPath(file, fileStats, blogDir, inBlog) {
	if (fileStats.isDirectory()) { HandleDirectory(file, blogDir, inBlog); }
	else if (numArticles > 0) { HandleArticles(blogDir); }
}

// Necessary function to scope the file variable properly for passing into the CheckPath function
function AssignFile(fileList, fileIndex, dir, inBlog) {
	// Local assign of the name of the file
	var file = fileList[fileInd];
	// Local assign of the full directory path
	var blogDir = pth.join(dir, file);
	// If in the respective blog directories, find out how many articles there are
	// This is done by incrementing a global counter because there are different blog categories with different fileList lengths
	if (inBlog) { numArticles = numArticles + 1; }

	// Call a stat on the blogDir path/file, return the stats object and pass it into CheckPath to see if its the right blog directory
	fs.stat( blogDir, (err, fileStats) => { CheckPath(file, fileStats, blogDir, inBlog) })
}


// Main call for module functionality
// Recursively called to get to actual blog directories
function WalkDirectory(dir, inBlog) {
	// Get file/folder list of passed directory
	fs.readdir(dir, (err, fileList) => {
		// From returned fileList, iterate over earch file and check if its a blog
		for (fileInd = 0; fileInd < fileList.length; fileInd++) {
			// Function call inside for loop because for loops don't maintain scope when passing variables
			AssignFile(fileList, fileInd, dir, inBlog, numArticles);
		}
	})
}

// Start of procedure
console.time("main");
WalkDirectory( "blog", false );
