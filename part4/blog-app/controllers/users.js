const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body
  // console.log(body)
  // console.log(!(body.password.length>3))
  if(!body.password || !(body.password.length>3)){
    response.status(400).json({error:'The password was not long enough'})
  }
  // console.log('request recieved, just before bcrypt hash')
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  // console.log('bcrypt hash running')

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })
  // console.log('just before saving the user')
  const savedUser = await user.save()
  // console.log('user saved')
  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs',{title:1,likes:1})
  response.json(users)
})

module.exports = usersRouter
