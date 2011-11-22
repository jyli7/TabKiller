function kill() {
	//grab and store the user input
	var input_title;
	
	//FOR C4
	if (document.main_form.sniper.value !== "") {
		input_title = document.main_form.sniper.value;
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
	
	// FOR BUNKER
	if (document.main_form.bunker.value !== "") {
		input_title = document.main_form.bunker.value;
		inputs = input_title.split(', ');
		
		//iterate through the tabs and kill the tabs whose titles match the user's input
		chrome.tabs.getAllInWindow(null, function(tabs){
			chrome.tabs.getSelected(null, function(tab){
				for(i in tabs) {
					var title = tabs[i].title;
					var safe = false;
					//did the user want to save the current tab?
					var save_current_tab = (inputs.indexOf("c;") !== -1);
					if ( save_current_tab === true && parseInt(i) === parseInt(tab.index)) {
						safe = true;
					}
					else {
						for (j in inputs) {
							if(title.match(new RegExp(inputs[j], "i")) !== null){
								safe = true;
								break
							}
						}	
					}
					//if the tab is not safe, kill it
					if(safe === false){
						chrome.tabs.remove(tabs[i].id);	
					}
				}
			});
		});
	}
	
	//FOR CANNON
	if (document.main_form.cannon.value !== "") {
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

}
