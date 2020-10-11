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
    <div>Title <input type='text' value={title} id="Title" onChange={({target})=>setTitle(target.value)}></input></div>
    <div>Author <input type='text' value={author} id="Author" onChange={({target})=>setAuthor(target.value)}></input></div>
    <div>Url <input type='text' value={url} id="Url" onChange={({target})=>setUrl(target.value)}></input></div>
    <button type="submit">Create New</button>
    </form>)
}

export default BlogForm
