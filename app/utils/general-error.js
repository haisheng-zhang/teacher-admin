'use strict'

class GeneralError extends Error {
    constructor(status, message) {
        super(message)
        this.status = status
    }
}
  
module.exports = GeneralError