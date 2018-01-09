# actual
A common function toolkit to speed up prototype and application development, for times when React would be too much, but jQuery or Underscore would be too little. 

Pair with [selectah.js](https://github.com/addama/selectah), my minimal jQuery clone to speed up DOM creation/traversal.

# Methods

## General

#### log()
	Actual.log([*])
	Actual.log('UserName is "', userName, '"')
	--> '2011-10-05T14:48:00.000Z handleLogin() UserName is "addama"'
A more verbose version of console.log, which has a timestamp and the name of the function that called it.
***
#### out()
	Actual.out(message, [type])
	Actual.out('Will write to a log file using the included PHP file')
Returns the promise used to do the write.

## Cookie

#### put()
	Actual.cookie.put(key, value, [expires])
	Actual.cookie.put('UserName', 'addama')
Writes a cookie with the given key and value.
Will optionally set an expire date if given.
***
#### get()
	Actual.cookie.get(key)
	Actual.cookie.get('UserName')
Returns the cookie for the given key, or false.
***
#### remove()
	Actual.cookie.remove(key)
	Actual.cookie.remove('UserName')
Removes the cookie for the given key, if it exists.
***
#### exists()
	Actual.cookie.exists(key)
	Actual.cookie.exists('UserName')
Checks if the given cookie key has been set.

## File

#### load()
	Actual.file.load(name, handler)
	Actual.file.load('filename.txt', function(result) { /* Consume the file */ })
Uses the included PHP file to asynchronously load the contents of a file.
Returns the promise used to do the read.
***
#### save()
	Actual.file.save(name, content)
	Actual.file.save('filename.txt', 'This will be written to filename.txt')
**Destructively** writes the given contents to a file.

## Storage

#### isAvailable()
	Actual.storage.isAvailable()
Returns true if localStorage is available by testing a temporary write, otherwise returns false.
***
#### put()
	Actual.storage.put(key, value)
	Actual.storage.put('UserName', 'addama')
Stores the given value in localStorage under the given key. Values are converted to a JSON string, so you may need to `JSON.parse()` it when you get it back out.
***
#### get()
	Actual.storage.get(key)
	Actual.storage.get('UserName')
	-> 'addama'
Returns the localStorage value for the given key, if it exists, otherwise returns false.
***
#### remove()
	Actual.storage.remove(key)
	Actual.storage.remove('UserName')
Removes the given key-value pair from localStorage, if it exists.
***
#### empty()
	Actual.storage.empty()
Empties the localStorage for your site.
***
#### size()
	Actual.storage.size()
Returns the byte size of localStorage for your site.

## Dropdown

#### values()
	Actual.dropdown.values(data, targetID, [swap])
	Actual.dropdown.values({ 'Customer': 'C', 'Vendor': 'V', 'Lead': 'L' }, 'customerTypeSelect')
Populates a dropdown using an object's keys as the option text, and each key's value as the option value, or the opposite if `swap` is `true`.
***
#### byKey()
	Actual.dropdown.byKey(data, targetID, valueKey, textKey)
	Actual.dropdown.byKey(users, 'userSelect', 'UserID', 'UserName')
Populates a dropdown using an array of objects, where the given keys are used as the text and value of the options, respectively.
***
#### selectByText()
	Actual.dropdown.selectByText(targetID, text)
	Actual.dropdown.selectByText('userSelect', 'addama')
Selects the option whose text matches the given value, if one exists. Useful for when you know what it says, but not what it means.
***
#### hasOptions()
	Actual.dropdown.hasOptions(targetID)
	Actual.dropdown.hasOptions('userSelect')
Returns true if the given select has option elements defined already.
***
#### empty()
	Actual.dropdown.empty(targetID)
	Actual.dropdown.empty('userSelect')
Removes options from the given select, rendering it empty.

## String

#### toTitleCase()
	Actual.string.toTitleCase(string)
	Actual.string.toTitleCase('Understanding your cat')
	--> 'Understanding Your Cat'
Converts a string to title case.
***
#### htmlSpecialChars()
	Actual.string.htmlSpecialChars(unsafe)
	Actual.string.htmlSpecialChars('The Fast & The Furious <1, 2, 3>')
	--> 'The Fast &amp; The Furious &lt;1, 2, 3&gt;'
Sanitizes a string for use in XML. Can easily be modified to be useful in URLs as well/instead.
***
#### makeRandom()
	Actual.string.makeRandom([length, bits])
	Actual.string.makeRandom(8)
	--> 'A573BEE1'
Creates a randomized alphanumeric string of the given length and bits.
Defaults to 20 characters in length, 36 bits.
***
#### ltrim()
	Actual.string.ltrim(string)
	Actual.string.ltrim('   Oregon')
	--> 'Oregon'
Removes leading spaces from the given string.
***
#### rtrim()
	Actual.string.rtrim(string)
	Actual.string.rtrim('Oregon   ')
	--> 'Oregon'
Removes trailing spaces from the given string.
***
#### slugify()
	Actual.string.slugify(string)
	Actual.string.slugify('Five tips & tricks for Scrum Masters -- Newbie edition')
	--> 'five-tips-and-tricks-for-scrum-masters-newbie-edition'
Returns a slugified blog URL version of the given string. Can easily be modified to shorten the slug by removing common words.

## Type

#### isString()
	Actual.type.isString(string)
	Actual.type.isString('addama')
	--> true
	Actual.type.isString(1500)
	--> false
Tests if the given value is a string.
***
#### isArray()
	Actual.type.isArray(array)
	Actual.type.isArray([ 1, 2, 3 ])
	--> true
	Actual.type.isArray({ 'UserName': 'addama' })
	--> false
Tests if the given value is an array.
***
#### isEmail()
	Actual.type.isEmail(string)
	Actual.type.isEmail('addama.sanders@gmail.com')
	--> true
	Actual.type.isEmail('t@t.t')
	--> false
Tests if the given value is a valid email address.
***
#### isPhone()
	Actual.type.isPhone(string)
	Actual.type.isPhone('1-800-999-9999')
	--> true
	Actual.type.isPhone('18009999999')
	--> true
	Actual.type.isPhone('555.5555')
	--> true
	Actual.type.isPhone('555.555.5555')
	--> true
Tests if the given value is a valid phone number.

## Array

#### pushUnique()
	Actual.array.pushUnique(array, item)
	Actual.array.pushUnique([ 0, 1, 2 ], 3)
	--> true
	Actual.array.pushUnique([ 0, 1, 2 ], 2)
	--> false
Pushes the given item to an array, but only if that item is not already present. Returns true on successful push, false otherwise.
***
#### unique()
	Actual.array.unique(array, [alsoSort])
	Actual.array.unique([ 2, 2, 2, 0, 0, 1 ], true)
	--> [ 0, 1, 2 ]
	Actual.array.unique([ 2, 2, 2, 0, 0, 1 ])
	--> [ 2, 0, 1 ]
Returns an array with only unique values from the given array. 
If `alsoSort` is `true`, the array is sorted as well.

## Util

#### varDump()
	Actual.util.varDump(data)
	Actual.util.varDump(users)
	--> [
		{
			'UserName': 'addama'
		}
	]
Returns a nicely indented variable that is easy to read for logging/debugging purposes.
***
#### fromConsole()
	Actual.util.fromConsole()
Returns true if the calling function has been run from the console. 
Check the output of this function at the beginning of any function you do/don't want run from a console.
***
#### generateUUID()
	Actual.util.generateUUID()
	--> '110ec58a-a0f2-4ac4-8393-c866d813b8d1'
Generates a version 4 Universally Unique Identifier (UUID).
***
#### ajax()
	Actual.util.ajax(url, data, method, goodHandler, badHandler)
	Actual.util.ajax('./getUsers.php', { 'dept': 'accounting' }, 'GET', displayUsers, showError)
A general AJAX function to reach resources in other locations. 
If `data` is defined, it is converted into a URL argument string: `?dept=accounting`.
Runs the given `goodHandler` if the request was successful, or `badHandler` if not.
***
#### isIE()
	Actual.util.isIE()
Checks if the browser is IE.
***
#### memoize()
	Actual.util.memoize(func)
	Actual.util.memoize(calculateCurrentYearProfit)
Caches the results of a given function so that its operations don't have to be run again every time the function is called.
Useful for expensive functions that have infrequently changing values, but that are frequently called.
Can be easily modified to cache for only a specific length of time.
***
#### debounce()
	Actual.util.debounce(func, wait, [isImmediate])
	Actual.util.debounce(validateUserInput, 300, false)
Prevents a function from being called repeatedly, enforcing a wait time in milliseconds between executions.
If `isImmediate` is `true`, the function is called immediately after debounce is called.
***
#### copyToClipboard()
	Actual.util.copyToClipboard(text)
	Actual.util.copyToClipboard('110ec58a-a0f2-4ac4-8393-c866d813b8d1')
Attempts to copy the given value to the clipboard.
***
#### openEmail()
	Actual.util.openEmail(email, [subject, body])
	Actual.util.openEmail('addama.sanders@gmail.com', 'Testing', 'I am testing emails!')
Constructs a `mailto:` URL, then tells the browser to open a new window/tab to that URL. The browser then decides what to do with it. If a default email provider/handler has been chosen by the user, that program/URL is loaded; otherwise, a popup is shown asking the user to select that default provider/handler.
***
#### wait()
	Actual.util.wait([ms])
	Actual.util.wait(3000)
Simulates an asynchronous call that takes a given amount of time. Returns a promise. If no wait time is given, a random wait between 800 and 2000 milliseconds is chosen.
***	
#### getFormData()
	Actual.util.getFormData(parent)
	Actual.util.getFormData('userAddressForm')
	--> {
		'street': {
			'id': 'userAddress_street',
			'name': 'street',
			'type': 'text',
			'value': '123 Test Ln',
			'disabled': false,
			'required': true
		},
		'state': {
			'id': 'userAddress_state',
			'name': 'state',
			'type': 'select',
			'value': 'OR',
			'disabled': false,
			'required': true
		}
		'wantsMail': {
			'id': 'userAddress_wantsMail',
			'name': 'wantsMail',
			'type': 'checkbox',
			'checked': false
			'disabled': false,
			'required': false
		}
	}
Creates an object containing useful information about all form elements (input, textarea, select, checkbox, radio) in the given parent element. 
Information includes: the element ID, the element name, the type (element type, unless element type is `input`, then the input type (phone, email, text, password, etc)), and whether the field is disabled or required.
	