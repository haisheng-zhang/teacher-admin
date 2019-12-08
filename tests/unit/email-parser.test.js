var assert = require('assert')
var findEmails = require('../../app/utils/email-parser').findEmails

describe('Emails', () => {
    describe('Email Helper', () =>  {
        it('finds single email in sentence', () =>  {
            var emailSentence = "Sentence with middle@sentence.com in it."
            assert.deepEqual(findEmails(emailSentence), ["middle@sentence.com"])
            assert.deepEqual(findEmails(emailSentence).length, 1)
        })

        it('finds multiple emails in sentence', () =>  {
            var emailSentence = "Sentence with multiple@sentence.com middle@sentence.com in them."
            assert.deepEqual(findEmails(emailSentence), ["multiple@sentence.com", "middle@sentence.com"])
            assert.deepEqual(findEmails(emailSentence).length, 2)
        })

        it('finds email at end of sentence: period', () =>  {
            var emailSentence = "Sentence with end@sentence.com."
            assert.deepEqual(findEmails(emailSentence), ["end@sentence.com"])
            assert.deepEqual(findEmails(emailSentence).length, 1)
        })

        it('finds email at end of sentence: question mark', () =>  {
            var emailSentence = "Sentence with end@sentence.com?"
            assert.deepEqual(findEmails(emailSentence), ["end@sentence.com"])
            assert.deepEqual(findEmails(emailSentence).length, 1)
        })

        it('finds email at end of sentence: exclamation point', () =>  {
            var emailSentence = "Sentence with end@sentence.com!"
            assert.deepEqual(findEmails(emailSentence), ["end@sentence.com"])
            assert.deepEqual(findEmails(emailSentence).length, 1)
        })

        it('finds email extra whitespace', () =>  {
            var emailSentence = "Sentence with      white@space.com      !"
            assert.deepEqual(findEmails(emailSentence), ["white@space.com"])
            assert.deepEqual(findEmails(emailSentence).length, 1)
        })

        it('finds examples in README.md', () => {
            var emailSentence = "Sentence with multiple@example.com and another@example.com"
            assert.deepEqual(findEmails(emailSentence), ["multiple@example.com", "another@example.com"])
            assert.deepEqual(findEmails(emailSentence).length, 2)
        })

        it('does not contain invalid email', () => {
            var emailSentence = "Sentence with e@e"
            assert.deepEqual(findEmails(emailSentence), [])
            assert.deepEqual(findEmails(emailSentence).length, 0)
        })
    })
})