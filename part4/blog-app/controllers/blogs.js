const blogsRouter=require('express').Router()
const Blog=require('../models/blog')
const User=require('../models/user')
const jwt=require('jsonwebtoken')


blogsRouter.get('/', async (req,res)=>{
  const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    res.json(blogs.map((blog) => blog.toJSON()));
})

blogsRouter.post('/', async (req,res)=>{
  // console.log('processing blog post request')
  const { body } = req
  const {token} = req
  // console.log(`the token attached to request was ${token}`)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  // console.log(`the token was decoded successfully`)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  // console.log(`about to look for user with id ${decodedToken.id}`)
  const user = await User.findById(decodedToken.id)
  // console.log('the blog post request is being processed')
  if(!body.title || !body.url){
    res.status(400).end()
  }
  const blog = new Blog({...body, user: user.id})
  // console.log('The main part of blog object was created')
  // console.log('arrived at blogs-post')
  if(!blog.likes){
    blog.likes=0
  }
  const saveBlog=await blog.save()
  user.blogs=user.blogs.concat(saveBlog._id)
  await user.save()
  res.status(201).json(saveBlog)
})

blogsRouter.delete('/:id', async (req,res)=>{
  const {token}=req
  const decodedToken=jwt.verify(token,process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const blog = await Blog.findById(req.params.id);
   if (!blog){
     return res.status(404).end();
   }
   if(blog.user.toString()===decodedToken.id){
     const user = await User.findById(decodedToken.id)
     user.blogs=user.blogs.filter(blogEntry=>blogEntry!==blog._id)
     user.save()
     await blog.remove()
     res.status(204).end()
   }
   else{
     return res.status(403).json({forbidden:'user is not authorized to perform this action'})
   }
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
