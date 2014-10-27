var moment = require('moment');

module.exports = function(env) {

	env.addFilter('dateFormat', function(date, format) {
		return moment(date).format(format);
	});

	env.addFilter('shorten', function(str, count) {
		return str.slice(0, count || 5);
	});

	env.addFilter('pagination', function(pageObj) {
		var pageHTML = '';
		var startPage = (pageObj.page - 2) < 1 ? 1 : (pageObj.page - 2);
		var endPage = (pageObj.page + 2) > pageObj.totalPage ? pageObj.totalPage : (pageObj.page + 2);

		var href = '';
		if (pageObj.category) {
			href = '?category=' + pageObj.category + '&page='; 
		} else {
			href = '?page=';
		}

		pageHTML += '<ul class="pagination pagination-sm">';
		if (pageObj.page === 1) {
			pageHTML += '<li class="disabled"><a href="#">&laquo;</a></li>';
		} else {
			pageHTML += '<li><a href="' + href + '1' + '">&laquo;</a></li>';
		}
		for (var i = startPage; i <= endPage; i++) {
			if (i === pageObj.page) {
				pageHTML += '<li class="active"><a href="#">' + i + ' <span class="sr-only">(current)</span></a></li>';
			} else {
				pageHTML += '<li><a href="' + href + i + '">' + i + '</a></li>';
			}
		}
		if (pageObj.page === pageObj.totalPage) {
			pageHTML += '<li class="disabled"><a href="#">&raquo;</a></li>';
		} else {
			pageHTML += '<li><a href="' + href + pageObj.totalPage + '">&raquo;</a></li>';
		}
		pageHTML += '</ul>';
		return pageHTML;
	});

}