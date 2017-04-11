const fs 						= require('fs');
const pth						= require('path');
const sg						= require('./modules/SG.js');
var categories 					= ['tech', 'personal'];

var blogFiles					= [];
var blogPreviews				= [];




// Main call for module functionality
function WalkBlogDirectory(dir, inBlog, foundArticles) {
	fs.readdir(dir, (err, files) => {
		files.forEach( (entry, ind) => {
			var blogDir = pth.join(dir, entry);
			fs.stat( blogDir, (err, fileStats) => {
				if (fileStats.isDirectory()) {
					if (categories.includes(entry)) { WalkBlogDirectory(blogDir, true, false); }
					else if (inBlog) { WalkBlogDirectory(blogDir, false, true); }
				} else if (foundArticles) {
					blogFiles.push(blogDir);
				}
			})
		})
	})
}

WalkBlogDirectory( "blog", false, false );
