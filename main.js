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

	$('body').on("keydown", handleKey);
});

function handleKey(ev) {
	var buildmenu = false;
	var buildmenudefer = false;
	var target = false;

	window.clearTimeout(menutimeout);

	// Escape, revert menu to default
	if(ev.keyCode == 27) {
		menusearch = '';
		buildmenu = true;
	// Backspace, remove last item from search term
	} else if(ev.keyCode == 8) {
		menusearch = menusearch.slice(0, -1);
		buildmenudefer = true;
		// stop browsers interpreting this as "back"
		ev.preventDefault();
	// Enter, go to the first target
	} else if(ev.keyCode == 13) {
		target = 0;
	// a-z, update search term
	} else if(ev.keyCode >= 65 && ev.keyCode <= 90) {
		menusearch += ev.key;
		buildmenudefer = true;
	// 1-9, go to selected target
	} else if(ev.keyCode >= 49 && ev.keyCode <= 49+maxmenucount-1) {
		target = ev.keyCode-49;
	}

	$('#searchterm').html(menusearch);
	
	if(buildmenu) {
		menuBuild();
	} else if(buildmenudefer) {
		menutimeout = window.setTimeout(menuBuild, 350);
	} else if(target !== false && menuhotkey[target] !== undefined) {
		document.location = menuhotkey[target];
	}
}

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
	if(typeof element.locicon !== 'undefined') {
		$('<img/>').attr('src', 'locicons/' + element.locicon).appendTo(contentfig);
	}


	var contentcaption = $('<figcaption/>').addClass('contentcaption').appendTo(contentfig);
	$('<span/>').html(element.name).appendTo(contentcaption);
}
