//auto-focus on sniper
$(document).ready(function() {
	$('#sniper_input').focus();	
});

var console = chrome.extension.getBackgroundPage().console;

//FOR SNIPER
function sniper(input_title, reload_arg) {
	inputs = input_title.split(', ');
  sniped_tabs = [];

	//iterate through tabs and kill the tabs whose titles match any part of user's input
	chrome.tabs.getAllInWindow(null, function(tabs){
		for (i in tabs) {
			var title = tabs[i].title;
			var safe = true;
			for (j in inputs) {
				if (title.match(new RegExp(inputs[j], "i")) !== null){
					safe = false;
          sniped_tabs.push(tabs[i].url);
					break
				}
			}
		
			if (safe === false){
				chrome.tabs.remove(tabs[i].id);	
			}
		}
 
    if (reload_arg === 1){
      reload(sniped_tabs);
    }
	});		
}	
	
// BUNKER FUNCTION
function bunker(input_title, reload_arg) {
	inputs = input_title.split(', ');
	non_bunker_tabs = [];

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
	      non_bunker_tabs.push(tabs[i].url);
			  chrome.tabs.remove(tabs[i].id);	
			}
		}
	 
    if (reload_arg === 1){
      reload(non_bunker_tabs);
    }
  });
}
	
//FOR CANNON
function cannon(input_title, reload_arg) {
	cannoned_tabs = [];

	//iterate through tabs and kill the tabs whose titles match any part of user's input
	chrome.tabs.getAllInWindow(null, function(tabs){
		//get the starting number and the ending number
		var boundaries = input_title.split('-');
		var start = parseInt(boundaries[0]);
		var end;

		if(boundaries.length === 1)
			end = start;
		else if(boundaries[1] === "end")
			end = tabs.length;
		else 
			end = parseInt(boundaries[1]);
		for(i in tabs) {
			if(i >= (start-1) && i <= (end-1)) {
				chrome.tabs.remove(tabs[i].id);
	      cannoned_tabs.push(tabs[i].url);
      }			
		}
	 
    if (reload_arg === 1){
      reload(cannoned_tabs);
    }
  });		
}

function shoot(reload_arg) {
	//grab and store the user input
	var input_title;
	var inputs;


	//Execute functions
	if (document.main_form.sniper.value != "") {
		var user_input = document.main_form.sniper.value;
		sniper(user_input, reload_arg);
	}
	
  else if (document.main_form.bunker.value != "") {
		var user_input = document.main_form.bunker.value;
		bunker(user_input, reload_arg);
	}
	
  else if (document.main_form.cannon.value != "") {
		var user_input = document.main_form.cannon.value;
		cannon(user_input, reload_arg);
	}
}

function reload(new_tabs) {
  if (new_tabs.length > 0){
    chrome.windows.create({url: new_tabs, focused: false});
  }
}

function onSubmitForm(){
  if(document.pressed == 'Shoot'){
    shoot(0);
  }
  else if(document.pressed == 'Shoot and Reload'){
    shoot(1);
  }
}
