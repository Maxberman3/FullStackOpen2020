import React, {useState} from 'react'

const BlogForm = ({addBlog})=>{
  const [title,setTitle]=useState('')
  const [author,setAuthor]=useState('')
  const [url,setUrl]=useState('')
  const handleBlogSubmit= (event)=>{
    event.preventDefault()
    addBlog({title,author,url})
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (<form onSubmit={handleBlogSubmit}>
    <div>Title <input type='text' value={title} name="Title" onChange={({target})=>setTitle(target.value)}></input></div>
    <div>Author <input type='text' value={author} name="Title" onChange={({target})=>setAuthor(target.value)}></input></div>
    <div>Url <input type='text' value={url} name="Title" onChange={({target})=>setUrl(target.value)}></input></div>
    <button type="submit">Create New</button>
    </form>)
}

export default BlogForm
