import { useState } from "react";
import PropTypes from "prop-types";
import Blog from "./Blog"
import BlogForm from "./BlogForm";
import blogService from '../services/blogs'

const BlogDisplay = ({
    blogs,
    nameOfLoggedInUser,
    handleLogout,
    setBlogs,
    setNotification
}) => {
    const [blogFormVisible, setBlogFormVisible] = useState(false);

    const createBlog = async (blogObject) => {
        let returnedBlog;
    
        returnedBlog = await blogService.create(blogObject);
        console.log(returnedBlog);
        
        setBlogs((prevblogs) => [...prevblogs, returnedBlog]);
        setNotification({
            message: `a new blog '${returnedBlog.title}' by '${returnedBlog.author}' added`,
            status: "success",
        });
        setTimeout(() => {
            setNotification(null);
        }, 5000);
        setBlogFormVisible(false);
    };
    
    const handleLike = async (blog) => {
        const userId = blog.user.id;
        delete blog.user;

        const updatedBlog = {
            ...blog,
            likes: blog.likes + 1,
            user: userId,
        };
        
        const returnedBlog = await blogService.update(blog.id, updatedBlog);
        setBlogs(blogs.map((b) => (b.id === blog.id ? returnedBlog : b)));
        setNotification({ message: `You liked '${blog.title}' by '${blog.author}'`, status: 'success' });
        setTimeout(() => {
            setNotification(null);
        }, 5000);
    }

    const handleBlogDelete = async (blog) => { 
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            try {
                await blogService.deleteBlog(blog.id);
                setBlogs(blogs.filter((b) => b.id !== blog.id));
                setNotification({ message: `Deleted '${blog.title}' by '${blog.author}'`, status: 'success' });
                setTimeout(() => {
                    setNotification(null);
                }, 5000);
            } catch (exception) {
                setBlogs(blogs.filter((b) => b.id !== blog.id));
                setNotification({ message: `'${blog.title}' by '${blog.author} already deleted'`, status: 'error' });
                setTimeout(() => {
                    setNotification(null);
                }, 5000);
            }
        }
    };

    if (blogs.length > 0) {
        blogs.sort((a, b) => b.likes - a.likes);
    }

    return (
        <div>        
            <p>
                {nameOfLoggedInUser} logged in
                <button onClick={handleLogout}>logout</button>
            </p>

            <h2>create new</h2>
            <BlogForm
                createBlog={createBlog}
                blogFormVisible={blogFormVisible}
            />
            <button onClick={() => setBlogFormVisible(!blogFormVisible)}>
                {blogFormVisible ? 'cancel' : 'create new blog'}
            </button>

            <div>
                {blogs.length > 0 && blogs.map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        handleLike={() => handleLike(blog)}
                        handleBlogDelete={() => handleBlogDelete(blog)}
                        nameOfLoggedInUser={nameOfLoggedInUser}
                    />
                ))}
            </div>
        </div>
    );
}

BlogDisplay.propTypes = {
    blogs: PropTypes.array.isRequired,
    nameOfLoggedInUser: PropTypes.string.isRequired,
    handleLogout: PropTypes.func.isRequired,
    setBlogs: PropTypes.func.isRequired,
    setNotification: PropTypes.func.isRequired,
};

export default BlogDisplay
