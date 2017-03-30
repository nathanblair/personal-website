var previewPost = "";

$.get(
	"tech/hire-me-banner/index.html",
	// "tech/pure-css-toggleable-dropdown/index.html",
	function( data ) {
		previewPost = data;
	}, "html"
)
	.done(function() {
		console.log(previewPost)
	});

$(document).ready(function() {
	$("main").append(previewPost);
})
