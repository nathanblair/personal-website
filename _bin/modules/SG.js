const fs 					= require('fs');
const cwd 					= process.cwd();
const featuredDir 			= cwd + '/blog/'; 				// To be cleared
const techDir 				= cwd + '/blog/tech/'; 			// To be cleared
const personalDir 			= cwd + '/blog/personal/'; 		// To be cleared

const catPattern 			= /<!--Category: (featured)-->/;
// Blog preview article pattern: should extract the blog article tag, header information (date, etc.) and the first <p> element!
const blogPattern 			= /(<article class="blogpost">[\s\S]*?<p>[\s\S]*?<\/p>)[\s\S]*?(\s?<\/article>)/;
const datePattern 			= /[\s\S]*?<header>[\s\S]*?<h3 id="blog-date">(.*)<\/h3>/;


exports.ClearArticles = () => {
	console.log('Clearing current contents...');

	// Clear the portion of the indexes between the <main> tag
	// TODO
	// Regex expression?
	// Buffer the index file, find the area between the main tag and replace with an empty string?

	console.log('Done clearing current contents!');
}


function WriteToFeatured(file, blogDate, source) {
	console.log('		Writing feature article...');

	// Determine appropriate order from post date
	// TODO

	// Write to the appropriate order
	// TODO

	console.log('		Done writing feature article!');
}

function WriteToRegular(file, blogDate, source, category) {
	console.log('		Writing new article...');

	// Determine appropriate order from post date
	// TODO

	// Write to the appropriate order
	// TODO

	console.log('		Done writing new article!');
}


exports.WriteArticles = (fileName, contents, category) => {
	console.log('Parsing file: ' + fileName + '...');

	// Extract the blog preview source
	var blogHTML = contents.match(blogPattern);
	// Extract if the blog file contains the 'featured' tag
	var featured = catPattern.test(contents);

	// Verify that the source contains the necessary information to create a preview
	// (includes the primary article tag and one introductory paragraph)
	if (blogHTML[1] != undefined && blogHTML[2] != undefined) {
		// Local save of the full preview source string
		var previewSrc = blogHTML[1] + blogHTML[2];

		// Extract the blog's post date
		var blogDate = previewSrc.match(datePattern);

		// Check that the post date is valid
		if (blogDate[1] != undefined) {
			console.log('	Blog recorded on: ' + blogDate[1]);
			
			// Populate the appropriate index with the blog in the appropriate order
			WriteToRegular(fileName, blogDate[1], previewSrc, category);

			// Feature the blog if necessary
			if (featured) {
				console.log('	Blog is featured!');
				// Populate the featured articles in the appropriate order
				WriteToFeatured(fileName, blogDate[1], previewSrc);
			}
		} else { console.log('Skipping: ' + fileName + ' because no post date could be parsed from it!'); }
	} else { console.log('Skipping: ' + fileName + ' because no standard preview data could be parsed from it!'); }
}