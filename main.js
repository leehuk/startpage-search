// configuration settings
const menuiconurl = 'icons/';
var maxmenucount = 5; // maximum 9

// internal variables
var menusearch = '';
var menutimeout;
var menuhotkey = [];

// Add hotkeys, letters for menus, numbers for items within a menu
$(document).ready(function() {
	menuBuild();

	$('body').on("keydown", function(ev) {
		window.clearTimeout(menutimeout);

		if(ev.keyCode == 27) {
			menusearch = '';
			menuBuild();
		} else if(ev.keyCode == 8) {
			menusearch = menusearch.slice(0, -1);
			menutimeout = window.setTimeout(menuBuild, 350);
			ev.preventDefault();
		// a-z || 0-9
		} else if(ev.keyCode >= 65 && ev.keyCode <= 90) {
			menusearch += ev.key;
			menutimeout = window.setTimeout(menuBuild, 350);
		} else if (ev.keyCode >= 49 && ev.keyCode <= 49+maxmenucount-1) {
			console.log("Redirecting to " + menuhotkey[ev.keyCode-49]);
			document.location = menuhotkey[ev.keyCode-49];
		} else if (ev.keyCode == 13) {
			console.log("Redirecting to " + menuhotkey[0]);
			document.location = menuhotkey[0];

		} else {
			console.log("Ignoring " + ev.key + " " + ev.keyCode);
		}

		$('#searchterm').html(menusearch);
	});
});

function menuClear() {
	var content = $('div.content');
	content.empty();
	menuhotkey = [];
}

function menuBuild() {
	var menucount = 0;
	var menuregex;

	menuClear();

	menuregex = new RegExp(menusearch, 'i');

	menu.some(function(element) {
		if(element.name.search(menuregex) >= 0) {
			menuBuildItem(element);
			menuhotkey[menucount] = element.url;
			menucount++;
		}

		return menucount >= maxmenucount;
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
