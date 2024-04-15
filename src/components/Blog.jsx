import PropTypes from "prop-types";
import ToggleableBlog from "./TogglableBlog";

const Blog = ({ blog, handleLike, nameOfLoggedInUser, handleBlogDelete }) => {
    return (
        <ToggleableBlog blog={blog}>
            <div>
                <div>{blog.url}</div>
                <div>
                    likes {blog.likes}
                    <button onClick={handleLike}>like</button>
                </div>
                <div>{blog.user.name}</div>
                {
                    nameOfLoggedInUser === blog.user.name
                    && <button onClick={handleBlogDelete}>remove</button>
                }
            </div>
        </ToggleableBlog>
    );
};

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    handleLike: PropTypes.func.isRequired,
    nameOfLoggedInUser: PropTypes.string.isRequired,
    handleBlogDelete: PropTypes.func.isRequired
};

export default Blog;