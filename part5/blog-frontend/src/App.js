import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/React'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationProps,setNotificationProps]=useState({notificationMessage:'',notificationColor:'green'})

  useEffect(()=>{
    const loggedUser=window.localstorage.getItem('blogUser')
    if(loggedUser){
      const blogUser=JSON.parse(loggedUser)
      setUser(blogUser)
    }
  },[])
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const handleLogin = async (event)=>{
    event.preventDefault()
    try{
      const blogUser=await loginService.login({username,password})
      window.localstorage.setItem('blogUser',JSON.stringify(blogUser))
      blogService.setToken(blogUser.token)
      setUser(blogUser)
      setUsername('')
      setPassword('')
    }catch{
      const loginFail={notificationMessage:"Incorrect Credentials", notificationColor:"red"}
      setNotificationProps(loginFail,3000)
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notificationMessage={notificationProps.notificationMessage} notificationColor={notificationProps.notificationColor}/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
