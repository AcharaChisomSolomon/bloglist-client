import { useState } from "react";
import Blog from "./Blog"
import BlogForm from "./BlogForm";
import blogService from '../services/blogs'

const BlogDisplay = ({
    blogs,
    name,
    handleLogout,
    setBlogs,
    setNotification
}) => {
    const [blogFormVisible, setBlogFormVisible] = useState(false);
    
    const handleLike = async (blog) => {
        if (blog.user.name !== name) {
            setNotification({ message: 'You can only like your own blogs', status: 'error' });
            setTimeout(() => {
                setNotification(null);
            }, 5000);
            console.log('You can only like your own blogs')
            return;
        }

        const userId = blog.user.id;
        const blogUser = blog.user;
        delete blog.user;

        const updatedBlog = {
            ...blog,
            likes: blog.likes + 1,
            user: userId,
        };
        const returnedBlog = await blogService.update(blog.id, updatedBlog);
        returnedBlog.user = blogUser;
        setBlogs(blogs.map((b) => (b.id === blog.id ? returnedBlog : b)));
        setNotification({ message: `You liked '${blog.title}' by '${blog.author}'`, status: 'success' });
        setTimeout(() => {
            setNotification(null);
        }, 5000);
    }

    return (
      <div>        
            <p>
                {name} logged in
                <button onClick={handleLogout}>logout</button>
            </p>

            <h2>create new</h2>
            <BlogForm
                setBlogs={setBlogs}
                setNotification={setNotification}
                blogFormVisible={blogFormVisible}
                setBlogFormVisible={setBlogFormVisible}
            />
            <button onClick={() => setBlogFormVisible(!blogFormVisible)}>
                {blogFormVisible ? 'cancel' : 'create new blog'}
            </button>

            <div>
            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    handleLike={() => handleLike(blog)}
                />
            ))}
            </div>
      </div>
    );
}

export default BlogDisplay