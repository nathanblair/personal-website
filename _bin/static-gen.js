const fs 						= require('fs');
const pth						= require('path');
const sg						= require('./modules/SG.js');
var categories 					= ['tech', 'personal'];

var blogFiles					= [];
var blogPreviews				= [];

var numArticles					= 0;
var blogsDone					= 0;


function CheckDirectory(file, fileStats, blogDir, inBlog) {
	if (fileStats.isDirectory()) {
		if (categories.indexOf(file) >= 0) { WalkBlogDirectory(blogDir, true, false); }
		else if (inBlog) { WalkBlogDirectory(blogDir, false, 0); }
	} else if (numArticles > 0) {
		blogFiles.push(blogDir);
		blogsDone = blogsDone + 1;
		if (blogsDone == numArticles) {
			console.log("Done!");
			console.timeEnd("main");
		}
	}
}


function BuildFiles(files, fileIndex, dir, inBlog) {
	var file = files[fileInd];
	var blogDir = pth.join(dir, file);
	if (inBlog) { 
		numArticles = numArticles + 1;
	}

	fs.stat( blogDir, (err, fileStats) => { CheckDirectory(file, fileStats, blogDir, inBlog) })
}


// Main call for module functionality
function WalkBlogDirectory(dir, inBlog) {
	fs.readdir(dir, (err, files) => {
		for (fileInd = 0; fileInd < files.length; fileInd++) {
			BuildFiles(files, fileInd, dir, inBlog, numArticles);
		}
	})
}

console.time("main");
WalkBlogDirectory( "blog", false );
