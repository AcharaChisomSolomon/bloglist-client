/* eslint-disable react/prop-types */
const Blog = ({ blog }) => { 
    return (
        <div>
            {blog.title} - {blog.author}
        </div>
    );
};

export default Blog;