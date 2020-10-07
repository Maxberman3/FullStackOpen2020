const Blog=require('../models/blog')
const User=require('../models/user')

const initialBlogs = [
  {
    title: 'blog1',
    author: 'Mr.BadAtTitlingBlogs',
    url:'www.notontheweb.org',
    likes:31
  },
  {
    title:'The merits of coding in your free time',
    author:'A very bored person',
    url:'www.harvardcs50.com',
    likes:29
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
  initialBlogs, getAllBlogs, usersInDb
}
