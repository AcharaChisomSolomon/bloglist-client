import Blog from "./Blog"
import BlogForm from "./BlogForm";

const BlogDisplay = ({
    blogs,
    name,
    handleLogout,
    setBlogs,
    setNotification
}) => {
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
            />

            <div>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
            </div>
      </div>
    );
}

export default BlogDisplay