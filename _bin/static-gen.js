const fs = require('fs');

const ASC = require('./modules/ASyncController');
const TH = require('./modules/TemplateHandler');

var filesRemoved = 0;

// Callback after initial files are removed
function FileRemoved_Callback(err) {
	if (err) { if (err.errno != -4058) { throw err; } }
	filesRemoved++
	if (filesRemoved == TH.numIndexes) {
		console.timeEnd('removeFiles');
		console.time('walk');
		ASC.TriggerWalk();
	}
}

// Delete the initial source files so they are not read by the walk procedure
function RemoveInitialFiles() {
	console.time('removeFiles');
	fs.unlink(TH.featuredFile, FileRemoved_Callback);
	fs.unlink(TH.techFile, FileRemoved_Callback);
	fs.unlink(TH.personalFile, FileRemoved_Callback);
}

// Start of procedure
console.time("main");

RemoveInitialFiles();

