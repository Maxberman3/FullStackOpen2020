const blogsRouter=require('express').Router()
const Blog=require('../models/blog')

blogsRouter.get('/',(req,res)=>{
  Blog
    .find({})
    .then(blogs => {
      res.json(blogs)
    })
})

blogsRouter.post('/',(req,res)=>{
  if(!req.body.title || !req.body.url){
    res.status(400).end()
  }
  const blog = new Blog(req.body)
  // console.log('arrived at blogs-post')
  if(!blog.likes){
    blog.likes=0
  }
  blog
    .save()
    .then(result => {
      res.status(201).json(result)
    })
})

module.exports=blogsRouter
