import { useState } from "react"
import PropTypes from "prop-types"
import blogService from "../services/blogs"

const BlogForm = ({
    setBlogs,
    setNotification,
    blogFormVisible,
    setBlogFormVisible
}) => { 
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const formDisplayStyle = { display: !blogFormVisible ? 'none' : '' }

    const addBlog = async (event) => {
        event.preventDefault()
        const blogObject = {
            title: title,
            author: author,
            url: url
        }

        const returnedBlog = await blogService.create(blogObject)
        setBlogs(prevblogs => [...prevblogs, returnedBlog])
        setNotification({ message: `a new blog '${returnedBlog.title}' by '${returnedBlog.author}' added`, status: 'success' })
        setTimeout(() => { setNotification(null) }, 5000)
        setBlogFormVisible(false)
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <form onSubmit={addBlog} style={ formDisplayStyle } >
            <div>
                title: <input
                    type="text"
                    value={title}
                    name="Title"
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                author: <input
                    type="text"
                    value={author}
                    name="Author"
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                url: <input
                    type="text"
                    value={url}
                    name="URL"
                    onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <button type="submit">create</button>
        </form>
    )
}

BlogForm.propTypes = {
    setBlogs: PropTypes.func.isRequired,
    setNotification: PropTypes.func.isRequired,
    blogFormVisible: PropTypes.bool.isRequired,
    setBlogFormVisible: PropTypes.func.isRequired
}

export default BlogForm