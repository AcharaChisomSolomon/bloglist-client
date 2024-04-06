import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, handleLike, nameOfLoggedInUser, handleBlogDelete }) => {
    const [visible, setVisible] = useState(false);
    const showWhenVisible = { display: visible ? '' : 'none' };

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
        paddingBottom: 5
    }

    return (
        <div style={blogStyle}>
            <div>
                {blog.title} - {blog.author}
                <button onClick={() => setVisible(!visible)}>{ visible ? 'hide' : 'view' }</button>
            </div>
            <div style={showWhenVisible}>
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
        </div>
    );
};

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    handleLike: PropTypes.func.isRequired,
    nameOfLoggedInUser: PropTypes.string.isRequired,
    handleBlogDelete: PropTypes.func.isRequired
};

export default Blog;