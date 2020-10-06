require('dotenv').config()

const PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test') {
  // console.log('in test environment')
  MONGODB_URI = process.env.TEST_MONGODB_URI
  // console.log(`read the environment var for db as ${MONGODB_URI}`)
}

module.exports = {
  MONGODB_URI,
  PORT
}
