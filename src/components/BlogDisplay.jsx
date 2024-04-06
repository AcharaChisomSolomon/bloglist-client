import Blog from "./Blog"

const BlogDisplay = ({ blogs, name, handleLogout }) => {
    return (
      <div>
            <h2>blogs</h2>
            
            <p>
                {name} logged in
                <button onClick={handleLogout}>logout</button>
            </p>

            <div>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
            </div>
      </div>
    );
}

export default BlogDisplay