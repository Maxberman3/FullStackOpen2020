import React from 'react'

const LoginForm = ({handleLogin,username,password,setUsername,setPassword})=>{
  return <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              id="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              id="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit" id="login-button">login</button>
        </form>
}

export default LoginForm
