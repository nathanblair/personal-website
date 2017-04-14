const fs = require('fs');

const ASC = require('./ASyncController');
const PH = require('./PreviewHandler');


var featuredSource = [""];
var techSource = [""];
var personalSource = [""];
var templatesDone = 0; var numTemplates = 3;

var templateFile = "blog/_template/preview.html";
var featuredFile = "blog/index.html";
var techFile = "blog/tech/index.html";
var personalFile = "blog/personal/index.html";

var filesWritten = 0;
var numFiles = 3;

exports.featuredFile = featuredFile;
exports.techFile = techFile;
exports.personalFile = personalFile;
exports.numFiles = numFiles;


// Inject appropriate link class into blog folder links
function InjectElements(source, path, previews) {
	const linkString = "<a href=\"/blog/" + path + "\" class=\"blog-source\">";
	const replaceString = "<a href=\"/blog/" + path + "\" class=\"blog-source active\">";
	const articleInsert = /(<section id="blog-population">[\s\S]*?)[\s\S]*?(<\/section>)/;

	// console.log(linkString.test(source));
	source = source.replace(linkString, replaceString);
	source = source.replace(articleInsert, "$1\n" + previews + "$2");
	return source;
}


// Grab and populate the blog templates
function Populator(templateString, path, previews) {
	fs.readFile(templateFile, 'utf8', (err, contents) => {
		templateString[0] = InjectElements(contents, path, previews);
		templatesDone++;
		if (templatesDone == numTemplates) {
			console.timeEnd("populatingArticles");
			ASC.TriggerWriteArticles();
		}
	});
}

// Wrapper to call the Populatorfor each category
function PopulateBlogTemplates() {
	console.time("populatingArticles");

	featuredArticles = PH.featuredArticles;
	techArticles = PH.techArticles;
	personalArticles = PH.personalArticles;

	Populator(featuredSource, "", featuredArticles);
	Populator(techSource, "tech/", techArticles);
	Populator(personalSource, "personal/", personalArticles);
}


// Write the full page source to the appropriate file
function WritePageSource(file, source) {
	fs.writeFile(file, source[0], (err) => {
		if (err) { throw err; }
		filesWritten++
		if (filesWritten == numFiles) {
			console.timeEnd("writeFiles");
			console.timeEnd("main");
			console.log("Everything is done!");
		}
	});
}

// Wrapper to call the WritePagesource for each category
function WriteArticlePages() {
	console.time("writeFiles");
	WritePageSource(featuredFile, featuredSource);
	WritePageSource(techFile, techSource);
	WritePageSource(personalFile, personalSource);
}


exports.PopulateBlogTemplates = PopulateBlogTemplates;
exports.WriteArticlePages = WriteArticlePages;
