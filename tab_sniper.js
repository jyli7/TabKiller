//auto-focus on sniper
$(document).ready(function() {
	$('#sniper_input').focus();	
});

var console = chrome.extension.getBackgroundPage().console;
//FOR SNIPER
function sniper(input_title) {
	inputs = input_title.split(', ');
		
	//iterate through tabs and kill the tabs whose titles match any part of user's input
	chrome.tabs.getAllInWindow(null, function(tabs){
		for(i in tabs) {
			var title = tabs[i].title;
			var safe = true;
			for (j in inputs) {
				if(title.match(new RegExp(inputs[j], "i")) !== null){
					safe = false;
					break
				}
			}
		
			if(safe === false){
				chrome.tabs.remove(tabs[i].id);	
			}			
		}
	});		
}	
	
// BUNKER FUNCTION

function bunker(input_title) {
	input_title = document.main_form.bunker.value;
	inputs = input_title.split(', ');
	//iterate through the tabs and kill the tabs whose titles match the user's input
	chrome.tabs.getAllInWindow(null, function(tabs){
		for(i in tabs) {
			var title = tabs[i].title;
			var safe = false;
			// did the user want to save the current tab?
			for (j in inputs) {
				if(title.match(new RegExp(inputs[j], "i")) !== null){
					safe = true;
					break
				}
			}
			//if the tab is not safe, kill it
			if(safe === false){
				chrome.tabs.remove(tabs[i].id);	
			}
		}
	});
}
	
//FOR CANNON
function cannon(input_title) {
	input_title = document.main_form.cannon.value;
	
	//get the starting number and the ending number
	var boundaries = input_title.split('-');
	var start = parseInt(boundaries[0]);
	var end;
	if(boundaries.length === 1)
		end = start;
	else 
		end = parseInt(boundaries[1]);
	//iterate through tabs and kill the tabs whose titles match any part of user's input
	chrome.tabs.getAllInWindow(null, function(tabs){
		for(i in tabs) {
			if(i >= (start-1) && i <= (end-1)) {
				chrome.tabs.remove(tabs[i].id);
			}			
		}
	});		
}


function kill() {
	//grab and store the user input
	var input_title;
	var inputs;
	
	//Execute functions
	
	if (document.main_form.sniper.value !== "") {
		var user_input = document.main_form.sniper.value;
		sniper(user_input);
	}
	
	if (document.main_form.bunker.value !== "") {
		var user_input = document.main_form.bunker.value;
		bunker(user_input);
	}
	
	if (document.main_form.cannon.value !== "") {
		var user_input = document.main_form.cannon.value;
		cannon(user_input);
	}

}
