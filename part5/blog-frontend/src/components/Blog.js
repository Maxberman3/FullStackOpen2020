import React, {useState} from 'react'
const Blog = ({ blog, updateBlog, deleteBlog,user }) => {
  const [conciseBlog,setConciseBlog]=useState(true)
  const belongsToUser=user.username===blog.user.username
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const toggleConcise = () => {
    setConciseBlog(!conciseBlog)
  }
  const handleLike = (event) =>{
    event.preventDefault()
    const newLikes={
      title:blog.title,
      author:blog.author,
      url:blog.url,
      user:blog.user.id,
      likes:blog.likes+1,
      id:blog.id
    }
    console.log(newLikes)
    updateBlog(newLikes)
  }
  const handleRemove = (event, title, id)=>{
    event.preventDefault()
    const confirmed=window.confirm(`You are going to delete ${title}, are you sure?`)
    if(confirmed){
      deleteBlog(id)
    }
  }
  return (<div style={blogStyle}>
    {conciseBlog && (<div>
      {blog.title} - {blog.author}
      <button onClick={toggleConcise}>view</button>
      </div>
    )}
    {!conciseBlog && (<div>
      {blog.title} - {blog.author} <br></br>
      {blog.url} <br></br>
      likes {blog.likes}  <button onClick={handleLike}>like</button> <br></br>
      {belongsToUser && <button onClick={(event)=>handleRemove(event,blog.title,blog.id)}>remove</button>}
      <button onClick={toggleConcise}> hide</button>
      </div>)}
    </div>
  )
}

export default Blog
