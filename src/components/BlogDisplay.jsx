import Blog from "./Blog"

const BlogDisplay = ({ blogs, name }) => {
    return (
      <div>
            <h2>blogs</h2>
            
            <p>{name} logged in</p>

            <div>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
            </div>
      </div>
    );
}

export default BlogDisplay