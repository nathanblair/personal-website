var pathName = ''
$.get('/head.html', data => { $('head').append(data) })

$.get('/nav.html', data => {
	$('main').before(data)
	pathName = window.location.pathname.replace(/^\/|\/$/g, '')
	window.document.title = window.document.title + ' ' + pathName
	$('.name-logo > span').html('you-are@<i>nathanblair.rocks</i> : ~/' + pathName + ' $ <span class="caret">&#9608;</span>')
})
$.get('/footer.html', data => { $('footer').html(data) })

if (window.location.pathname !== '/') { $('#' + pathName).addClass('active') }
else { $('#' + window.location.hostname.split('.')[0]).addClass('active'); }
