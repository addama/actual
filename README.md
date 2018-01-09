# actual
A common function toolkit to speed up prototype and application development, for times when React would be too much, but jQuery or Underscore would be too little. 

Pair with [selectah.js](https://github.com/addama/selectah), my minimal jQuery clone to speed up DOM creation/traversal.

# Methods

## General

	Actual.log([*])
	Actual.log('UserName is "', userName, '"')\
--> `2011-10-05T14:48:00.000Z handleLogin() UserName is "addama"`
A more verbose version of console.log, which has a timestamp and the name of the function that called it.

	Actual.out(message, type)
	Actual.out('Will write to a log file using the included PHP file')
Returns the promise used to do the write.

## Cookie

	Actual.cookie.put(key, value, [expires])
	Actual.cookie.put('UserName', 'addama')
Writes a cookie with the given key and value.
Will optionally set an expire date if given.
	
	Actual.cookie.get(key)
	Actual.cookie.get('UserName')
Returns the cookie for the given key, or false.

	Actual.cookie.remove(key)
	Actual.cookie.remove('UserName')
Removes the cookie for the given key, if it exists.

	Actual.cookie.exists(key)
	Actual.cookie.exists('UserName')
Checks if the given cookie key has been set.

## File

	Actual.file.load(name, handler)
	Actual.file.load('filename.txt', function(result) { /* Consume the file */ })
Uses the included PHP file to asynchronously load the contents of a file.
Returns the promise used to do the read.

	Actual.file.save(name, content)
	Actual.file.save('filename.txt', 'This will be written to filename.txt')
**Destructively** writes the given contents to a file.

## Storage

	Actual.storage.isAvailable()
Returns true if localStorage is available by testing a temporary write, otherwise returns false.

	Actual.storage.put(key, value)
	Actual.storage.put('UserName', 'addama')
Stores the given value in localStorage under the given key. Values are converted to a JSON string, so you may need to `JSON.parse()` it when you get it back out.

	Actual.storage.get(key)
	Actual.storage.get('UserName')
Returns the localStorage value for the given key, if it exists, otherwise returns false.

	Actual.storage.remove(key)
	Actual.storage.remove('UserName')
Removes the given key-value pair from localStorage, if it exists.

	Actual.storage.empty()
Empties the localStorage for your site.

	Actual.storage.size()
Returns the byte size of localStorage for your site.

## Dropdown

	Actual.dropdown.values(data, targetID, [swap])
	Actual.dropdown.values({ 'Customer': 'C', 'Vendor': 'V', 'Lead': 'L' }, 'customerTypeSelect')
Populates a dropdown using an object's keys as the option text, and each key's value as the option value, or the opposite if `swap` is `true`.

	Actual.dropdown.byKey(data, targetID, valueKey, textKey)
	Actual.dropdown.byKey(users, 'userSelect', 'UserName', 'UserID')
Populates a dropdown using an array of objects, where the given keys are used as the text and value of the options, respectively.

	Actual.dropdown.selectByText(targetID, text)
	Actual.dropdown.selectByText('userSelect', 'addama')
Selects the option whose text matches the given value, if one exists. Useful for when you know what it says, but not what it means.

	Actual.dropdown.hasOptions(targetID)
	Actual.dropdown.hasOptions('userSelect')
Returns true if the given select has option elements defined already.

	Actual.dropdown.empty(targetID)
	Actual.dropdown.empty('userSelect')
Removes options from the given select, rendering it empty.

## String

	Actual.string.toTitleCase(string)
	Actual.string.toTitleCase('Understanding your cat')
--> `Understanding Your Cat`
Converts a string to title case.

	Actual.string.htmlSpecialChars(unsafe)
	Actual.string.htmlSpecialChars('The Fast & The Furious <1, 2, 3>')
--> `The Fast &amp; The Furious &lt;1, 2, 3&gt;`
Sanitizes a string for use in XML. Can easily be modified to be useful in URLs as well/instead.

	Actual.string.makeRandom(length, bits)
	Actual.string.makeRandom(8)
--> `A573BEE1`
Creates a randomized alphanumeric string of the given length and bits.
Defaults to 20 characters in length, 36 bits.

	Actual.string.ltrim(string)
	Actual.string.ltrim('   Oregon')
--> `Oregon`
Removes leading spaces from the given string.

	Actual.string.rtrim(string)
	Actual.string.rtrim('Oregon   ')
--> `Oregon`
Removes trailing spaces from the given string.


	