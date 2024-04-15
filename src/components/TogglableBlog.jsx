import { useState } from 'react';
 
const ToggleableBlog = ({ children, blog }) => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: "solid",
      borderWidth: 1,
      marginBottom: 5,
      paddingBottom: 5,
    };

    if (!visible) {
        return (
          <div style={blogStyle} className="blog">
            <div>
              {blog.title} - {blog.author}
              <button onClick={toggleVisibility}>view</button>
            </div>
          </div>
        );
    }

    return (
      <div style={blogStyle} className="blog">
        <div>
          {blog.title} - {blog.author}
          <button onClick={toggleVisibility}>hide</button>
        </div>
        {children}
      </div>
    );
}

export default ToggleableBlog;