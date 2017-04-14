const fs = require('fs');

const ASC = require('./ASyncController');
const PH = require('./PreviewHandler');


var featureTemplate = "";
var techTemplate = "";
var personalTemplate = "";
var templatesDone = 0; var numTemplates = 3;

var templateFile = "blog/_template/preview.html";


// Inject appropriate link class into blog folder links
function InjectElements(source, path, previews) {
	const linkString = "<a href=\"blog/" + path + "\" class=\"blog-source\">";
	const replaceString = "<a href=\"blog/" + path + "\" class=\"blog-source active\">";
	const articleInsert = /<section id="blog-population">[\s\S]*?([\s\S]*?)<\/section>/;

	source = source.replace(linkString, replaceString);

	console.log(articleInsert[1].test(source));
	return source;
}


// Grab and populate the blog templates
function Populator(templateString, path, previews) {
	fs.readFile(templateFile, 'utf8', (err, contents) => {
		templateString = InjectElements(contents, path, previews);
		templatesDone++;
		if (templatesDone == numTemplates) {
			console.timeEnd("populatingArticles");
			console.log(featureTemplate);
			console.timeEnd("main");
		}
	});
}

// Wrapper to call the Populatorfor each category
function PopulateBlogTemplates() {
	console.time("populatingArticles");

	featuredPreviews = PH.featuredArticles;
	techPreviews = PH.techArticles;
	personalPreviews = PH.personalArticles;

	Populator(featureTemplate, "", featuredPreviews);
	Populator(techTemplate, "tech/", techPreviews);
	Populator(personalTemplate, "personal/", personalPreviews);
}


exports.PopulateBlogTemplates = PopulateBlogTemplates;
