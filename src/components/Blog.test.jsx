import { render, screen } from '@testing-library/react';
import Blog from './Blog';

test('renders content with only title and author by default', () => { 
    const blog = {
        id: '1',
        title: 'Component testing is done with react-testing-library',
        author: 'Test Author',
        url: 'http://localhost',
        likes: 0,
        user: {
            name: 'Test User',
            username: 'testuser',
            id: '2'
        }
    };

    const { container } = render(<Blog blog={blog} />);
    const div = container.querySelector('.blog');
    // screen.debug(div);

    // const titleAndAuthorDiv = screen.getByText(`${blog.title} - ${blog.author}`);
    const urlDiv = screen.queryByText(`${blog.url}`);
    const likesDiv = screen.queryByText(`likes ${blog.likes}`);

    expect(div).toHaveTextContent(`${blog.title} - ${blog.author}`);
    expect(urlDiv).toBeNull();
    expect(likesDiv).toBeNull();
});