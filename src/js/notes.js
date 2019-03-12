/*
*   notes.js
*/
import 'bootstrap';
import '../scss/app.scss';
import './custom.js';
import $ from 'jquery';
/*
*	load more posts
*/
var load_more = {};
load_more.posts = [];

load_more.get_previous_date = function (incoming_date) {

	var post_dates, previous_date_idx;
	post_dates = load_more.posts.map(function(element) { return element.date; }).sort();
	previous_date_idx = post_dates.indexOf(incoming_date) - 1;
	return previous_date_idx > -1 ? post_dates[previous_date_idx] : undefined;
	
};

load_more.button_id = "load_more_button";

load_more.remove_load_button = function () {
	var element = document.getElementById(load_more.button_id);
	element.parentNode.removeChild(element);
};

/*
	load previous post
*/
load_more.load_previous = function () {
	var previous_date;
	previous_date = load_more.get_previous_date(load_more.current_load_date);
	load_more.load_post(load_more.getPostByDate(previous_date));
};

load_more.getPostByDate = function (post_date) {

	var postElement;

	postElement = undefined;

	if(post_date === undefined) {
		return undefined;
	}

	load_more.posts.forEach(function(element) {
  		if(element.date === post_date) {
  			postElement = element;
  			return;
  		}
	});

	return postElement;
};

/*
	load post in to the document
*/
load_more.load_post = function(post_element) {

	var sNotesURL;

	
	if(post_element !== undefined) {

		sNotesURL = post_element.url;

		$.get(sNotesURL, function(sNewPost) {
		    var document_element_id, notes_element, new_post_element;
			document_element_id = "notes";

			notes_element = document.getElementById(document_element_id);

			new_post_element = document.createElement('div');
			new_post_element.innerHTML = sNewPost;
			notes_element.appendChild(new_post_element);

			load_more.current_load_date = post_element.date;

			if(load_more.get_previous_date(load_more.current_load_date) === undefined) {
				/*
				*/
				load_more.remove_load_button();
			}
		});
	}
};
/*
	get recent element
*/
load_more.get_recent = function () {
	var last_date;
	last_date = "2018-05-05";
	return load_more.getPostByDate(last_date);
};
/*
	init posts list
*/

load_more.posts.push({
	date: "2018-05-02",
	url: "/notes-2018-05-02.html"
});

load_more.posts.push({
	date: "2018-05-05",
	url: "/notes-2018-05-05.html"
});

document.getElementById(load_more.button_id).onclick = function() {
	load_more.load_previous();
	return false;
};
/**
 * load recent posts
 */
load_more.load_post(load_more.get_recent());