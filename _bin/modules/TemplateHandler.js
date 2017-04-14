const fs = require('fs');

const ASC = require('./ASyncController');


var featureTemplate = "";
var techTemplate = "";
var personalTemplate = "";
var templatesDone = 0; var numTemplates = 3;

var templateFile = "blog/_template/preview.html";


// Inject appropriate link class into blog folder links
function InjectClass(source, path) {
	var linkString = "<a href=\"blog/" + path + "\" class=\"blog-source\">";
	var replaceString = "<a href=\"blog/" + path + "\" class=\"blog-source active\">";

	source = source.replace(linkString, replaceString);
	return source;
}


// Grab and populate the blog templates
function Populator(templateString, path) {
	fs.readFile(templateFile, 'utf8', (err, contents) => {
		templateString = InjectClass(contents, path);
		templatesDone++;
		if (templatesDone == numTemplates) {
			console.timeEnd("populatingArticles");
			console.timeEnd("main");
		}
	});
}

// Wrapper to call the Populatorfor each category
function PopulateBlogTemplates() {
	console.time("populatingArticles");
	Populator(featureTemplate, "");
	Populator(techTemplate, "tech/");
	Populator(personalTemplate, "personal/");
}


exports.PopulateBlogTemplates = PopulateBlogTemplates;
