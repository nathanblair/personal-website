const fs 					= require('fs');

const catPattern 			= /<!--Category: (featured)-->/;
// Blog preview article pattern: should extract the blog article tag, header information (date, etc.) and the first <p> element!
const blogPattern 			= /(<article class="blogpost">[\s\S]*?<p>[\s\S]*?<\/p>)[\s\S]*?(\s?<\/article>)/;
const datePattern 			= /[\s\S]*?<header>[\s\S]*?<h3 id="blog-date">(.*)<\/h3>/;


exports.GetBlogPreview = (fileName, contents, category) => {

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
			var returnArray = [blogDate[1], previewSrc, featured]
			
			return returnArray;
		} else { console.log('Skipping: ' + fileName + ' because no post date could be parsed from it!'); }
	} else { console.log('Skipping: ' + fileName + ' because no standard preview data could be parsed from it!'); }
}