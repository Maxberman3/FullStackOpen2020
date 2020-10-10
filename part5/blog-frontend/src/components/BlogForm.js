import React from 'react'

const BlogForm = ({title,author,url,setTitle,setAuthor,setUrl,handleBlogSubmit})=>{
  return (<form onSubmit={handleBlogSubmit}>
    <div>Title <input type='text' value={title} name="Title" onChange={({target})=>setTitle(target.value)}></input></div>
    <div>Author <input type='text' value={author} name="Title" onChange={({target})=>setAuthor(target.value)}></input></div>
    <div>Url <input type='text' value={url} name="Title" onChange={({target})=>setUrl(target.value)}></input></div>
    <button type="submit">Create New</button>
    </form>)
}

export default BlogForm
