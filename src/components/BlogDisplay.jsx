import { useState } from "react";
import Blog from "./Blog"
import BlogForm from "./BlogForm";

const BlogDisplay = ({
    blogs,
    name,
    handleLogout,
    setBlogs,
    setNotification
}) => {
    const [blogFormVisible, setBlogFormVisible] = useState(false);

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
                {blogFormVisible ? 'cancel' : 'new blog'}
            </button>

            <div>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
            </div>
      </div>
    );
}

export default BlogDisplay