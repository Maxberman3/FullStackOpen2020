const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../utils/test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'seltzerMan',
      name: 'Pellegrino',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
   const usersAtStart = await helper.usersInDb()

   const newUser = {
     username: 'root',
     name: 'Superuser',
     password: 'salainen',
   }

   const result = await api
     .post('/api/users')
     .send(newUser)
     .expect(400)
     .expect('Content-Type', /application\/json/)

   expect(result.body.error).toContain("Error, expected `username` to be unique.")

   const usersAtEnd = await helper.usersInDb()
   expect(usersAtEnd).toHaveLength(usersAtStart.length)
 })

 test('creation fails with proper statuscode and message if password not long enough', async () =>{
   // console.log('The test can start')
   const usersAtStart = await helper.usersInDb()

   const newUser = {
     username: 'root2',
     name: 'Superuser',
     password: 'sal',
   }

   const result = await api
     .post('/api/users')
     .send(newUser)
     .expect(400)
     .expect('Content-Type', /application\/json/)

   expect(result.body.error).toContain('The password was not long enough')

   const usersAtEnd = await helper.usersInDb()
   expect(usersAtEnd).toHaveLength(usersAtStart.length)
 })

 // test('creation fails with proper statuscode if username not included', async () =>{
 //   const usersAtStart = await helper.usersInDb()
 //
 //   const newUser = {
 //     name: 'Superuser',
 //     password: 'sal',
 //   }
 //
 //   const result = await api
 //     .post('/api/users')
 //     .send(newUser)
 //     .expect(400)
 //     .expect('Content-Type', /application\/json/)
 //
 //   const usersAtEnd = await helper.usersInDb()
 //   expect(usersAtEnd).toHaveLength(usersAtStart.length)
 // })
})


afterAll(() => {
  mongoose.connection.close()
})
