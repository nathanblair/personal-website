const EventEmitter = require('events');

const walk = require('./Walker');
const PH = require('./PreviewHandler');

class ASyncController extends EventEmitter { };
const asyncController = new ASyncController();

// Trigger for a blog file being handled
asyncController.on('blogFilePushed', (file, numArticles) => {
	// Perform asynchronously
	setImmediate(() => { PH.PushPreview(file, numArticles); })
});

// 
asyncController.on('blogPreviewsFinished', () => {
	// Perform asynchronously
	setImmediate(() => { PH.InjectPermalinkToPreview(); })
})


// Wrapper to emit the blogFilePushed event
function TriggerBlogPush(file, numArticles) { asyncController.emit('blogFilePushed', file, numArticles); }

//
function TriggerPermalinkInjection() { asyncController.emit('blogPreviewsFinished'); }

exports.TriggerBlogPush = TriggerBlogPush;
exports.TriggerPermalinkInjection = TriggerPermalinkInjection;