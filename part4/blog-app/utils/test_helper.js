const Blog=require('../models/blog')
const User=require('../models/user')
const mongoose=require('mongoose')

const id=mongoose.Types.ObjectId()
const blogId1=mongoose.Types.ObjectId()
const blogId2=mongoose.Types.ObjectId()

const initialUser={
  username:'root',
  _id:id,
  blogs:[blogId1,blogId2]
}
const initialBlogs = [
  {
    title: 'blog1',
    author: 'Mr.BadAtTitlingBlogs',
    url:'www.notontheweb.org',
    likes:31,
    user:id,
    _id:blogId1
  },
  {
    title:'The merits of coding in your free time',
    author:'A very bored person',
    url:'www.harvardcs50.com',
    likes:29,
    user:id,
    _id:blogId2
  }
]

const getAllBlogs = async ()=>{
  // console.log('in getAllBlogs method')
  const response=await Blog.find({})
  // console.log(response)
  return response.map(blog=>blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports={
  initialBlogs, getAllBlogs, usersInDb, initialUser
}
