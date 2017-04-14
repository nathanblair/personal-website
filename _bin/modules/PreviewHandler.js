const fs = require('fs');

const ASC = require('./ASyncController');

var blogPreviews = [];
var featuredBlogs = [];
var featuredArticles = "";
var techBlogs = [];
var techArticles = "";
var personalBlogs = [];
var personalArticles = "";

var previewsPushed = 0;

const featuredPattern = /<!--Category: (featured)-->/;
// Blog preview article pattern: should extract the blog article tag, header information (date, etc.) and the first <p> element!
const blogPattern = /(<article class="blogpost">[\s\S]*?<p>[\s\S]*?<\/p>)[\s\S]*?(\s?<\/article>)/;
const datePattern = /[\s\S]*?<header>[\s\S]*?<h3 id="blog-date">(.*)<\/h3>/;
const headerPattern = /<header>[\s\S]*?<h1 id="title">([\s\S]*?)<\/h1>/;
const categoryPattern = /blog\\([\s\S]*?)\\[\s\S]*?/


// Extract blog preview source using regular expressions
function GetBlogPreview(fileName, contents) {
	// Extract the blog preview source
	var blogHTML = contents.match(blogPattern);
	// Extract if the blog file contains the 'featured' tag
	var featured = featuredPattern.test(contents);
	// Extract the category from the file name
	var category = fileName.match(categoryPattern)[1];

	// Verify that the source contains the necessary information to create a preview
	// (includes the primary article tag and one introductory paragraph)
	if (blogHTML[1] != undefined && blogHTML[2] != undefined) {
		// Local save of the full preview source string
		var previewSrc = blogHTML[1] + blogHTML[2];

		// Extract the blog's post date
		var blogDate = previewSrc.match(datePattern);
		blogDate = new Date(blogDate[1]);

		// Check that the post date is valid
		if (blogDate != undefined) { return [blogDate, previewSrc, featured, fileName, category]; }
			else { console.log('Skipping: ' + fileName + ' because no post date could be parsed from it!'); } 
	} else { console.log('Skipping: ' + fileName + ' because no standard preview data could be parsed from it!'); }
}


// Get the blog preview source
// When all previews are retrieved, wrap up preview procedure
function PushPreviewSource(file, numArticles) {
	// Read a source file, return the contents, and pass the contents to be parsed to the sg.GetBlogPreview
	// sg.GetBlogPreview populates the blogPreviews array with the blog post date, the article source, and a featured flag
	fs.readFile(file, 'utf8', (err, contents) => {
		// Start the preview procedure timer if this is the first time a preview has been pushed
		if (previewsPushed == 1) { console.time("previews"); }
		// Get the preview source and data and push it into the local container
		blogPreviews.push(GetBlogPreview(file, contents));
		// Increment the number of previews retrieved to know when procedure is complete
		previewsPushed = previewsPushed + 1;
		// Procedure is complete when previews pushed == number of articles
		if (previewsPushed == numArticles) {
			// Wrap up
			console.log("Previews Found: " + blogPreviews.length);
			// console.log(blogPreviews);
			console.timeEnd("previews");
			ASC.TriggerPermalinkInjection();
		}
	})
}


// Build the anchor string to be injected
function BuildAnchorString(permalink, title) {
	permalink = permalink.replace("index.html", "");
	permalink = permalink.replace(/\\/g, "/");
	var anchor = "<a href=\"" + permalink + ">" + title + "</a>";
	return anchor;
}

// Inject the permalink anchor into the header text of each blog preview
function InjectPermalinkToPreview() {
	console.time("permalinkInjection");
	for (blogInd = 0; blogInd < blogPreviews.length; blogInd++) {
		var titleString = blogPreviews[blogInd][1].match(headerPattern);
		var injectedString = BuildAnchorString(blogPreviews[blogInd][3], titleString[1]);

		// Replace the title text with a permalink (still using the title of the article)
		blogPreviews[blogInd][1] = blogPreviews[blogInd][1].replace(titleString[1], injectedString);
	}
	console.timeEnd("permalinkInjection");

	// Trigger the next event
	ASC.TriggerSortPreviews();
}


// Swap two elements in an array and return the swapped array
function Swap(array, leftInd, rightInd) {
	var leftTemp = array[leftInd];
	var rightTemp = array[rightInd];
	array[leftInd] = rightTemp;
	array[rightInd] = leftTemp;
	return array;
}


// Sort the blog previews in the blogPreviews array
function SortBlogPreviews() {
	console.time("sortBlogPreviews");

	// Sort the blogs
	var currentInd = 0;
	var checkedInd = 0;
	var needSwap = true;
	var notSorted = true;

	while (notSorted) {
		if (currentInd == blogPreviews.length - 1) { notSorted = false; break; }
		checkedInd = currentInd + 1;
		needSwap = true;
		while (needSwap) {
			if (checkedInd == blogPreviews.length - 1) { needSwap = false; currentInd++; }
			if (blogPreviews[currentInd][0] < blogPreviews[checkedInd][0]) {
				blogPreviews = Swap(blogPreviews, currentInd, checkedInd); 
				needSwap = false;
			} else { checkedInd++; }
		}
	}

	console.timeEnd("sortBlogPreviews");
	ASC.TriggerAssortCategories();
}


// Assign blog previews to appropriate category arrays
function AssortBlogCategories() {
	console.time("assortCategories");
	for (currInd = 0; currInd < blogPreviews.length; currInd++) {
		if (blogPreviews[currInd][4] == "tech") { techBlogs.push(blogPreviews[currInd][1]); }
		else if (blogPreviews[currInd][4] == "personal") { personalBlogs.push(blogPreviews[currInd][1]); }

		if (blogPreviews[currInd][2]) { featuredBlogs.push(blogPreviews[currInd][1]); }
	}

	console.timeEnd("assortCategories");
	ASC.TriggerConcatenateBlogs();
}


// String articles together for a given blog
function StringArticles(blogArray) {
	blogArticles = "";
	for (article = 0; article < blogArray.length; article++) { 
		blogArticles = blogArticles + blogArray[article] + "\n"; 
	}
	return blogArticles;
}


// Wrapper to StringArticles called for each of the blogs
function ConcatenateBlogs() {
	console.time("concatenateBlogs");

	featuredArticles = StringArticles(featuredBlogs);
	techArticles = StringArticles(techBlogs);
	personalArticles = StringArticles(personalBlogs);

	exports.featuredArticles = featuredArticles;
	exports.techArticles = techArticles;
	exports.personalArticles = personalArticles;

	console.timeEnd("concatenateBlogs");

	ASC.TriggerPopulateTemplates();
}


exports.PushPreview = PushPreviewSource;
exports.InjectPermalinkToPreview = InjectPermalinkToPreview;
exports.SortBlogPreviews = SortBlogPreviews;
exports.AssortBlogCategories = AssortBlogCategories;
exports.ConcatenateBlogs = ConcatenateBlogs;