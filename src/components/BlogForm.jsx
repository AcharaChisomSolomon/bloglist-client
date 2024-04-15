import { useState } from "react"
import PropTypes from "prop-types"

const BlogForm = ({
    createBlog,
    blogFormVisible,
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
        await createBlog(blogObject)
        
        setTitle("");
        setAuthor("");
        setUrl("");
    }

    return (
        <form onSubmit={addBlog} style={ formDisplayStyle } >
            <div>
                title: <input
                    type="text"
                    data-testid="title"
                    value={title}
                    name="Title"
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                author: <input
                    type="text"
                    data-testid="author"
                    value={author}
                    name="Author"
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                url: <input
                    type="text"
                    data-testid="url"
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
    createBlog: PropTypes.func.isRequired,
    blogFormVisible: PropTypes.bool.isRequired,
}

export default BlogForm