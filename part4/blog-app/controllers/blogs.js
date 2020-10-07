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

blogsRouter.delete('/:id', async (req,res)=>{
  const id = req.params.id
  // console.log(id)
  await Blog.findByIdAndRemove(id)
  res.status(204).end()
})

blogsRouter.put('/', async (req,res)=>{
  const body=req.body
  const updateBlog ={
    title:body.title,
    author:body.author,
    url:body.url,
    likes:body.likes,
  }
  // console.log(updateBlog)
  const afterUpdate = await Blog.findByIdAndUpdate(body.id,updateBlog,{new:true})
  res.json(afterUpdate)
})

module.exports=blogsRouter
