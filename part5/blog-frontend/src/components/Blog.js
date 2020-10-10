import React, {useState} from 'react'
const Blog = ({ blog }) => {
  const [conciseBlog,setConciseBlog]=useState(true)
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
  return (<div style={blogStyle}>
    {conciseBlog && (<div>
      {blog.title} - {blog.author}
      <button onClick={toggleConcise}>view</button>
      </div>
    )}
    {!conciseBlog && (<div>
      {blog.title} - {blog.author} <br></br>
      {blog.url} <br></br>
      likes {blog.likes}  <button>like</button> <br></br>
      <button onClick={toggleConcise}> hide</button>
      </div>)}
    </div>
  )
}

export default Blog
