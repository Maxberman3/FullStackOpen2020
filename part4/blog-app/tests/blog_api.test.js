const mongoose = require('mongoose')
const supertest = require('supertest')
const helper=require('../utils/test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  // console.log(helper.initialBlogs)
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

describe('get blogs', ()=>{
  test('returns all', async ()=>{
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  test('id is defined', async ()=>{
    const response = await api.get('/api/blogs')
    // console.log(response.body)
    expect(response.body[0].id).toBeDefined()
  })
})

test('post blog', async ()=>{
  const newBlog = {
    title: 'The importance of being earnest and also writing good unit tests',
    author: 'The AI that rules your test framework',
    url:'www.iliveinsideofyourappandeatyourcode.com',
    likes:100,
  }
  await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)
  const dbBlogs= await helper.getAllBlogs()
  // console.log(dbBlogs)
  expect(dbBlogs).toHaveLength(helper.initialBlogs.length+1)
  const titles = dbBlogs.map(blog=>blog.title)
  expect(titles).toContain('The importance of being earnest and also writing good unit tests')
})

test('likes defaults to 0', async()=>{
  const newBlog = {
    title: 'The importance of being earnest and also writing good unit tests',
    author: 'The AI that rules your test framework',
    url:'www.iliveinsideofyourappandeatyourcode.com',
  }
  const response =await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)
  // console.log(response.body)
  expect(response.body.likes).toEqual(0)
})

test('no title or url returns 400', async()=>{
  const newBlog = {
    author:'Coffee McCoffee',
    url:'www.buzzbuzzbuzz.com',
    likes:20,
  }
  await api.post('/api/blogs').send(newBlog).expect(400)
  const newerBlog = {
    author: 'Coffee McCoffee Jr. Jr.',
    title:'Why caffeine is responsible for 90% of the world\'s productivity',
    likes:30,
  }
  await api.post('/api/blogs').send(newerBlog).expect(400)
})

describe('delete by id', ()=>{
  test('verify deletion', async ()=>{
    let allBlogs=await helper.getAllBlogs()
    let deleteId=allBlogs[0].id
    // console.log(`/api/blogs/${deleteId}`)
    await api.delete(`/api/blogs/${deleteId}`).expect(204)
    allBlogs=await helper.getAllBlogs()
    expect(allBlogs).toHaveLength(helper.initialBlogs.length-1)
  })
})

test('update a blog', async ()=>{
  let allBlogs=await helper.getAllBlogs()
  const beforeUpdate=allBlogs[0]
  const updateBlog={...beforeUpdate, likes:beforeUpdate.likes+1}
  // console.log(updateBlog)
  const response = await api.put('/api/blogs').send(updateBlog).expect(200)
  // console.log(response.body)
  expect(response.body.likes).toEqual(beforeUpdate.likes+1)
  allBlogs=await helper.getAllBlogs()
  const afterUpdate=allBlogs[0]
  expect(afterUpdate.likes).toEqual(beforeUpdate.likes+1)
})

afterAll(()=>{
  mongoose.connection.close()
})
