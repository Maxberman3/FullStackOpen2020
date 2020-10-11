import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationProps,setNotificationProps]=useState({notificationMessage:'',notificationColor:'green'})

  useEffect(()=>{
    const loggedUser=window.localStorage.getItem('blogUser')
    if(loggedUser){
      const blogUser=JSON.parse(loggedUser)
      setUser(blogUser)
      blogService.setToken(blogUser.token)
    }
  },[])
  useEffect(() => {
  const setInitialBlogs= async ()=>{
    try{
      let intialBlogs= await blogService.getAll()
      const sortedBlogs=intialBlogs.sort((curr,next)=>{
        return next.likes-curr.likes
      })
      setBlogs(sortedBlogs)
    }catch(error){
      const loadFail={notificationMessage:error.message,notificationColor:"red"}
      setNotificationProps(loadFail,3000)
    }
  }
  setInitialBlogs()
  }, [])

  const handleLogin = async (event)=>{
    event.preventDefault()
    try{
      const blogUser=await loginService.login({username,password})
      window.localStorage.setItem('blogUser',JSON.stringify(blogUser))
      blogService.setToken(blogUser.token)
      setUser(blogUser)
      setUsername('')
      setPassword('')
    }catch{
      const loginFail={notificationMessage:"Incorrect Credentials", notificationColor:"red"}
      setNotificationProps(loginFail,3000)
    }
  }
  const handleLogout = async (event)=>{
    window.localStorage.removeItem('blogUser')
    blogService.setToken(null)
    setUser(null)
  }
  const addBlog = async (newBlog)=>{
    try{
      const addedBlog=await blogService.createNew(newBlog)
      setBlogs(blogs.concat(addedBlog))
      const addSuccess={notificationMessage:"New blog successfully created", notificationColor:"green"}
      setNotificationProps(addSuccess,3000)
    }catch(error){
      const addFail={notificationMessage:error.message, notificationColor:"red"}
      setNotificationProps(addFail,3000)
    }
  }
  const updateBlog = async (blog)=>{
    try{
      const updatedBlog=await blogService.updateBlog(blog)
      const updateBlogs=blogs.filter(oldBlog=>oldBlog.id!==blog.id).concat(updatedBlog)
      setBlogs(updateBlogs)
    }
    catch(error){
      const updateFail={notificationMessage:error.message,notificationColor:"red"}
      setNotificationProps(updateFail,3000)
    }
  }
  const deleteBlog = async (id)=>{
    try{
      await blogService.deleteBlog(id)
      const removeBlog=blogs.filter(blog=>blog.id!==id)
      setBlogs(removeBlog)
    }
    catch(error){
      const removeFail={notificationMessage:error.message,notificationColor:"red"}
      setNotificationProps(removeFail,3000)
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notificationMessage={notificationProps.notificationMessage} notificationColor={notificationProps.notificationColor}/>
      {!user &&
        <LoginForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword}/>
      }
      {user && (<div>
        <h3> {user.username} is logged in </h3><button onClick={handleLogout}>logout</button>
        <Togglable buttonLabel="Submit new blog">
        <BlogForm addBlog={addBlog}/>
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user}/>
        )}
      </div>)}
    </div>
  )
}

export default App
