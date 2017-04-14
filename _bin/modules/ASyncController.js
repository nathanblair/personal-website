const EventEmitter = require('events');

const walk = require('./Walker');
const PH = require('./PreviewHandler');
const TH = require('./TemplateHandler');

class ASyncController extends EventEmitter { };
const asyncController = new ASyncController();

// Initial index files were deleted, proceed with walk
asyncController.on('initialIndexesDeleted', () => {
	// Perform asynchronously
	setImmediate(() => { walk.Walk("blog", false); })
});

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

// Assorting is done - concatenate blog articles
asyncController.on('blogsAssorted', () => {
	// Perform asynchronously
	setImmediate(() => { PH.ConcatenateBlogs(); })
})

// Blogs are concatenated - populate template strings
asyncController.on('blogsConcatenated', () => {
	// Perform asynchronously
	setImmediate(() => { TH.PopulateBlogTemplates(); })
})

// Template strings are gathered - write to the files
asyncController.on('templatesCreated', () => {
	// Perform asynchronously
	setImmediate(() => { TH.WriteArticlePages(); })
})

// Wrapper to emit the initialIndexesDeleted event
function TriggerWalk() { asyncController.emit('initialIndexesDeleted'); }

// Wrapper to emit the blogFilePushed event
function TriggerBlogPush(file, numArticles) { asyncController.emit('blogFilePushed', file, numArticles); }

// Wrapper to emit the blogPreviewFinished event
function TriggerPermalinkInjection() { asyncController.emit('blogPreviewsFinished'); }

// Wrapper to emit the linksInjected event
function TriggerSortPreviews() { asyncController.emit('linksInjected'); }

// Wrapper to emit the blogsSorted event
function TriggerAssortCategories() { asyncController.emit('blogsSorted'); }

// Wrapper to emit the blogsAssorted event
function TriggerConcatenateBlogs() { asyncController.emit('blogsAssorted'); }

// Wrapper to emit the blogsConcatenated event
function TriggerPopulateTemplates() { asyncController.emit('blogsConcatenated'); }

// Wrapper to emit the templatesCreated event
function TriggerWriteArticles() { asyncController.emit('templatesCreated'); }


exports.TriggerWalk = TriggerWalk;
exports.TriggerBlogPush = TriggerBlogPush;
exports.TriggerPermalinkInjection = TriggerPermalinkInjection;
exports.TriggerSortPreviews = TriggerSortPreviews;
exports.TriggerAssortCategories = TriggerAssortCategories;
exports.TriggerConcatenateBlogs = TriggerConcatenateBlogs;
exports.TriggerPopulateTemplates = TriggerPopulateTemplates;
exports.TriggerWriteArticles = TriggerWriteArticles;