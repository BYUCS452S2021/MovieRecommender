const crypto = require('crypto')
const {v4: uuidv4} = require('uuid')

const makeError = (code, message) => ({
  code,
  response: {
    error: message
  }
})

const hash = password => {
  const sha512 = crypto.createHash('sha512')
  sha512.update(password)
  return sha512.digest('hex')
}

const genToken = () =>
  hash(uuidv4())

module.exports = {makeError, hash, genToken}
