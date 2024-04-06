import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogDisplay from './components/BlogDisplay'
import LoginForm from './components/LoginForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    if (!user) return
    async function fetchBlogs() { 
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [user])
  

  const handleLogin = async (event) => { 
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.error('wrong credentials')
    }
  }


  return (
    <div>
      {!user && <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleLogin={handleLogin}
      />}
      {user && <BlogDisplay blogs={blogs} name={user.name} />}
    </div>
  )
}


export default App
