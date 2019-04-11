function GetBlogTags() {
    let blogTags = []
    $('#blog-list > li').each((index, element) => {
        $(element).attr('class').split(' ').forEach(name => {
            if (blogTags.indexOf(name) === -1) blogTags.push(name)
        })
    })
    return blogTags
}

function WriteBlogs(tag) {
    $('#blog-list > li.' + tag).each((index, element) => { $.get($(element).text(), html => {
        $('#blog-population').append(html)
        $('.blog-post').last().toggleClass('preview')
    })})
}

$('#blog-list').each((index, element) => {
    $('main').prepend('<ul class="blog-tag-list"></ul>')
    GetBlogTags().forEach(tag => {
        $('.blog-tag-list').append(
            '<li class="blog-tag">\
                <input type="radio" class="hidden blog-tags" name="blog-tags" id="' + tag + '">\
                <label for="' + tag + '" class="tag-label">' + tag + '</label>\
            </li>'
        )
        $('#featured').prop('checked', true)
    })
    WriteBlogs('featured')
})

$('body').on('change', '.blog-tags', eventArgs => { $('.blog-post').remove(); WriteBlogs($(eventArgs.target).next().text()) })

$('body').on('click', '.blog-post', eventArgs => {
    $(eventArgs.target).closest('.blog-post').toggleClass('preview')
})
