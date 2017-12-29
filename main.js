// configuration settings
const menuiconurl = 'icons/';
var maxmenucount = 5;

// internal variables
var menusearch = '';
var menutimeout;

// Add hotkeys, letters for menus, numbers for items within a menu
$(document).ready(function() {
	$('body').on("keydown", function(ev) {
		window.clearTimeout(menutimeout);

		if(ev.keyCode == 27) {
			menusearch = '';
			menuClear();
		} else if(ev.keyCode == 8) {
			menusearch = menusearch.slice(0, -1);
			menutimeout = window.setTimeout(menuBuild, 350);
			ev.preventDefault();
		// a-z || 0-9
		} else if((ev.keyCode >= 65 && ev.keyCode <= 90) || (ev.keyCode >= 48 && ev.keyCode <= 57)) {
			menusearch += ev.key;
			menutimeout = window.setTimeout(menuBuild, 350);
		} else {
			console.log("Ignoring " + ev.key + " " + ev.keyCode);
		}
	});
});

function menuClear() {
	var content = $('div.content');
	$(content).empty();
}

function menuBuild() {
	var menucount = 0;
	var menuregex;

	menuClear();

	menuregex = new RegExp(menusearch, 'i');

	menu.forEach(function(element) {
		if(element.name.search(menuregex) >= 0) {
			menuBuildItem(element);
			console.log('matched: ' + element.name);
		}
	});

	console.log(menusearch);
}

function menuBuildItem(element) {
	var content = $('div.content');
	var contentlink = $('<a/>').addClass('contentlink').attr('href', element.url).appendTo(content);
	var contentfig = $('<figure/>').addClass('contentfig').appendTo(contentlink);

	// add image to figure if we have one
	if(typeof element.icon !== 'undefined') {
		$('<img/>').attr('src', menuiconurl + element.icon).appendTo(contentfig);
	}

	var contentcaption = $('<figcaption/>').addClass('contentcaption').appendTo(contentfig);
	$('<span/>').html(element.name).appendTo(contentcaption);
}
