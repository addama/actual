var Actual = {
	cookieExpire: 14,
	routes: {},
	// The location of the main actual.php file
	phpLoc: './',
	
	log: function log(message, type) {
		// A slightly more verbose console.log
		// Does not do multiple arguments like console.log does, though
		var caller = Actual.log.caller.name || '';
		var now = new Date().toISOString();
		if (!type) type = 'info';
		console.log(now, caller + '()', message);
	},
	
	out: function out(message, type) {
		// Writes log messages to a file
		return Actual.util.ajax('Actual.php', {
			op: 'log',
			m: message || 'No message',
			t: type || 'info',
		});
	},
	
	cookie: {
		bake: function cookieBake(name, value, expires) {
			// Bakes a new cookie. If no expires date is provided, the cookie will become a session cookie.
			var cookie = name + '=' + encodeURI(value) + ';';

			if (expires) {
				expires = new Date(expires);
				cookie += 'expires=' + expires.toUTCString() + ';';
			}
			document.cookie = cookie;
		},

		get: function cookieGet(name) {
			// Searches document.cookie for a cookie by a given name and returns the value if one is found.
			var temp = document.cookie.split(/;\s*/);
			for(var i = 0, l = temp.length; i < l; i++) {
				var foundName = temp[i].split('=')[0];
				if (foundName === name) return temp[i].split('=')[1];
			}
			return false;
		},

		eat: function cookieEat(name) {
			// Deletes a given cookie by setting an expiration date in the past
			if (Actual.cookie.get(name)) {
				var date = new Date(1985, 3, 22);
				Actual.cookie.bake(name, '', date);
			}
		},
	
		exists: function cookieExists(name) {
			// Checks if a cookie with the given name exists
			var cookie = Actual.cookie.get(name);
			if (cookie) return true;
			return false;
		},
	},
	
	file: {
		load: function fileLoad(name, handler) {
			// Load a file and return the contents
			return Actual.util.ajax('Actual.php', {
				op: 'load',
				f: name
			}, 'GET', function(result) {
				if (result) {
					handler(result);
					return true;
				} else {
					Actual.log(name + ' could not be loaded');
					return false;
				}
			});
		},
		
		save: function fileSave(name, content) {
			// Save content to the file
			// If no contents are given, the file is wiped out
			// Be careful!
			return Actual.util.ajax('Actual.php', {
				op: 'save',
				f: name,
				d: content || ''
			}, 'GET', function(result) {
				if (result) {
					return true;
				} else {
					Actual.log(name + ' could not be saved');
					return false;
				}
			});
		},
	},

	route: {
		add: function routeAdd(path, name, parent, handler) {
			// Registers a route and its info
			Actual.routes[path] = {
				'name': name, 'path': path, 'handler': handler, 'parent': parent
			};
		},
		
		remove: function routeRemove(path) {
			// Deletes a route
			delete Actual.routes[path];
		},
		
		listen: function routeListen(element) {
			// Listens for changes to the hash portion of the URL
			// If a hash that has been registered as a route is used, it runs the handler,
			// giving it the element it has been allowed to work within, and any arguments
			if (Object.keys(Actual.routes).length > 0) {
				if (element) {
					var handler = function hashChange(event) {
						var path = location.hash.slice(1) || '/';
						var levels = path.split('/').length;
						var split = path.split('/');
						split.shift();
						
						if (Actual.routes[path]) {
							var parent = Actual.routes[path].parent;
							Actual.routes[path].handler.call(parent, path.split('/').slice(levels));
						} else {
							var temp = path.split('/');
							for (var i = 1; i < levels; i++) {
								if (Actual.routes[temp.join('/')]) {
									path = temp.join('/');
									var parent = Actual.routes[path].parent;
									Actual.routes[path].handler.call(parent, split.slice(levels - i));
									break;
								}
								temp.pop();
							}
						}
					};
					window.onhashchange = handler;
					window.onload = handler;
					Actual.log('Actual is now listening for hashchanges on ' + Object.keys(Actual.routes).length + ' route(s)', 'local');
				} else {
					Actual.log('Cannot apply route changes - no target element given', 'local');
				}
			} else {
				Actual.log('Cannot listen to route changes - no routes have been defined.', 'local');
			}
		},
	
		move: function routeMove(path) {
			// Moves the browser to the given hash route
			if (Actual.routes[path]) {
				window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path
			}
		},
	},
	
	dropdown: {
		values: function(data, targetID, swap) {
			// Populates a dropdown using an object's keys as the text and each key's
			// value as the option value
			if (!swap) swap = false;
			if (targetID.charAt(0) === '#') targetID = targetID.substring(1);
			var element = document.getElementById(targetID);
			for (var i = 0, l = Object.getOwnPropertyNames(data).length; i < l; i++) {
				var key = Object.getOwnPropertyNames(data)[i];
				var value = data[key];
				var option = document.createElement('option');
				option.textContent = (swap) ? value : key;
				option.setAttribute('value', (swap) ? key : value);
				element.appendChild(option);
			};
		},
		
		byKey: function(data, targetID, valueKey, textKey) {
			// Populates a dropdown using an array of objects, using the given textKey
			// as the option text, and valueKey as the value from each object
			if (!valueKey && !textKey) return false;
			if (valueKey && !textKey) textKey = valueKey;
			if (targetID.charAt(0) === '#') targetID = targetID.substring(1);
			var element = document.getElementById(targetID);
			for (var i = 0, l = data.length; i < l; i++) {
				var text = data[i][textKey] || '';
				var value = data[i][valueKey] || '';
				var option = document.createElement('option');
				option.textContent = text;
				option.setAttribute('value', value);
				element.appendChild(option);
			}
		},
		
		selectByText: function(targetID, text) {
			// Selects an option based on the given text value, which must be exact
			if (targetID.charAt(0) === '#') targetID = targetID.substring(1);
			var element = document.getElementById(targetID);
			var children = element.children;
			for (var i = 0, l = children.length; i < l; i++) {
				children[i].selected = false;
				var data = children[i].textContent;
				if (data == text) children[i].selected = true;
			}
		},

		hasOptions: function(targetID) {
			// Returns true if the select has at least one option
			if (targetID.charAt(0) === '#') targetID = targetID.substring(1);
			var element = document.getElementById(targetID);
			return (element.children.length > 0) ? true : false;
		},
		
		empty: function empty(targetID) {
			// Empties a select (or anything) of its children
			if (targetID.charAt(0) === '#') targetID = targetID.substring(1);
			var element = document.getElementById(targetID);
			while (element.firstChild) element.removeChild(element.firstChild);
		},
	},

	string: {
		toTitleCase: function toTitleCase(string) {
			// Converts a string to proper case: String, Addama, Power
			return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		},
		
		htmlSpecialChars: function htmlSpecialChars(unsafe) {
			// Sanitizes a string for use in XML
			if (typeof unsafe === 'string') return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
			return unsafe;
		},
		
		makeRandomString: function makeRandomString(length, bits) {
			// Creates a randomized string of the given length, in the given bits
			// Useful for creating generic but unique IDs, session keys, or whatever
			length = length || 20;
			bits = bits || 36;
			var result = '';
			var temp;
			while (result.length < length) {
				temp = Math.random().toString(bits).slice(2);
				result += temp.slice(0, Math.min(temp.length, (length - result.length)));
			}
			return result.toUpperCase();
		},
		
		ltrim: function ltrim(string) {
			return string.replace(/^\s+/, '');
		},
		
		rtrim: function rtrim(string) {
			return string.replace(/\s+$/, '');
		},
		
		slugify: function slugify(string) {
			return text.toString().toLowerCase().trim().replace(/&/g, '-and-').replace(/[\s\W-]+/g, '-').replace(/\-\-+/g, '-').replace(/^-+|-+$/g, '');
		}
	},
	
	array: {
		pushUnique: function pushUnique(array, item) {
			// Pushes an item to the given array given that it's not already there
			if (array.indexOf(item) === -1) {
				array[array.length] = item;
				return true;
			}
			return false;
		},
		
		unique: function arrayUnique(array, alsoSort) {
			// Uniques the given array, and also optionally sorts the array once done
			if (!alsoSort) alsoSort = false;
			var temp = [];
			for (var i = 0, l = array.length; i < l; i++) {
				if (temp.indexOf(array[i]) === -1 && array[i] !== '') temp[temp.length] = array[i];
			}
			if (alsoSort) temp.sort(); 
			return temp;
		},
	},
	
	util: {
		varDump: function varDump(data) {
			// Returns a nicely indented string version of the given variable for logging/debugging purposes
			return JSON.stringify(data, null, '\t');
		},

		fromConsole: function fromConsole() {
			// Returns true if the calling function has been run from the console
			// Add as a boolean check to the top of any functions you don't want 
			// run from the console
			var stack;
			try {
			   throw new Error();
			} catch (e) {
				stack = e.stack;
			}
			
			if (!stack) return false;
			var lines = stack.split("\n");
			for (var i = 0, l = lines.length; i < l; i++) {
				// Chrome console
				if (lines[i].indexOf("at Object.InjectedScript.") >= 0) return true;  
				// Firefox console
				if (lines[i].indexOf("@debugger eval code") == 0) return true; 
				// Safari console				
				if (lines[i].indexOf("_evaluateOn") == 0) return true;   
			}
			return false;
		},
		
		generateUUID: function generateUUID() {
			// Generates a compliant UUID
			var d = new Date().getTime();
			if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
				d += performance.now();
			}
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
				var r = (d + Math.random() * 16) % 16 | 0;
				d = Math.floor(d / 16);
				return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
			});
		},
	
		ajax: function ajax(url, data, method, goodHandler, badHandler) {
			// A simple AJAX function 
			var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest : new ActiveXObject('Microsoft.XMLHTTP');
			if (!method) method = 'GET';
			if (method === 'POST') {
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
			}
			
			if (data instanceof Object) {
				var query = [];
				for (var key in data) {
					query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
				}
				data = query.join('&');
			}
			
			xhr.open(method, url + '?' + data, true);
			if (badHandler) xhr.onerror = badHandler;
			xhr.onload = function() {
				if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
					if (goodHandler) {
						goodHandler(xhr.responseText);
					} else {
						return xhr.responseText;
					}
				}	
			}

			xhr.send(null);
			return xhr;
		},
		
		isIE: function isIE() {
			return /*@cc_on!@*/false;
		},
	
	},

}