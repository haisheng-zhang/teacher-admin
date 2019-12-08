'use strict'

module.exports = {

findEmails: (string) => {
	console.log(`string to find email: ${string}`)
	var emails = findEmailsInternal(string)
	console.log(`email found in string: ${emails.join('  ')}`)

	return emails
},

}

function findEmailsInternal (string){
	var wordArray = string.split(" ")
	var result = []
	wordArray.forEach((word) => {
		if (word.match(/[@]/) !== null) {
			if (word[word.length - 1].match(/[,:;.!?]/)) {
				word = word.slice(0, -1)
			}

			if (isValidEmail(word)) {
				result.push(word)
			}
		}
	})

	return result
}

function isValidEmail(word) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(word)
}
