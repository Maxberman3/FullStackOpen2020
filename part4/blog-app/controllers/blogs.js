const blogsRouter=require('express').Router()
const Blog=require('../models/blog')
const User=require('../models/user')

blogsRouter.get('/', async (req,res)=>{
  const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    res.json(blogs.map((blog) => blog.toJSON()));
})

blogsRouter.post('/', async (req,res)=>{
  const { body } = req;
  // console.log('the blog post request is being processed')
  if(!body.title || !body.url){
    res.status(400).end()
  }
  const blog = new Blog(body)
  // console.log('The main part of blog object was created')
  // console.log('arrived at blogs-post')
  if(!blog.likes){
    blog.likes=0
  }
  const saveBlog=await blog.save()
  res.status(201).json(saveBlog)
})

blogsRouter.delete('/:id', async (req,res)=>{
  const id = req.params.id
  // console.log(id)
  await Blog.findByIdAndRemove(id)
  res.status(204).end()
})

blogsRouter.put('/', async (req,res)=>{
  const {body}=req
  const updateBlog ={
    title:body.title,
    author:body.author,
    url:body.url,
    likes:body.likes,
    user:body.user
  }
  // console.log(updateBlog)
  const afterUpdate = await Blog.findByIdAndUpdate(body.id,updateBlog,{new:true})
  res.json(afterUpdate)
})

module.exports=blogsRouter
