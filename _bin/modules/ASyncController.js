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

// Blog previews are populated, inject the link tags into the previews
asyncController.on('blogPreviewsFinished', () => {
	// Perform asynchronously
	setImmediate(() => { PH.InjectPermalinkToPreview(); });
})

// Link tags are injected, sort the blog preview list
asyncController.on('linksInjected', () => {
	// Perform asynchronously
	setImmediate(() => { PH.SortBlogPreviews(); });
})

// Sorting is done - separate blogs by category
asyncController.on('blogsSorted', () => {
	// Perform asynchronously
	setImmediate(() => { PH.AssortBlogCategories(); } );
})


// Wrapper to emit the blogFilePushed event
function TriggerBlogPush(file, numArticles) { asyncController.emit('blogFilePushed', file, numArticles); }

// Wrapper to emit the blogPreviewFinished event
function TriggerPermalinkInjection() { asyncController.emit('blogPreviewsFinished'); }

// Wrapper to emit the linksInjected event
function TriggerSortPreviews() { asyncController.emit('linksInjected'); }

// Wrapper to emit the blogsSorted event
function TriggerAssortCategories() { asyncController.emit('blogsSorted'); }

exports.TriggerBlogPush = TriggerBlogPush;
exports.TriggerPermalinkInjection = TriggerPermalinkInjection;
exports.TriggerSortPreviews = TriggerSortPreviews;
exports.TriggerAssortCategories = TriggerAssortCategories;