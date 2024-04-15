import { render, screen } from '@testing-library/react';
import Blog from './Blog';
import { expect } from 'vitest';

test('renders content', () => {
    const handleLike = vi.fn();
    const handleBlogDelete = vi.fn();

    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Test Author',
        url: 'https://www.example.com',
        likes: 0,
        user: {
            id: '2',
            name: 'Test User',
            username: 'testuser'
        },
        id: '1'
    };

    render(<Blog
        blog={blog}
        handleLike={handleLike}
        handleBlogDelete={handleBlogDelete}
        nameOfLoggedInUser='Test User'
    />);

    const title = screen.queryByText('Component testing is done with react-testing-library');
    const url = screen.queryByText('https://www.example.com');
    const likes = screen.queryByText('likes 0');

    expect(title).toBeDefined();
    expect(url).toBeNull();
    expect(likes).toBeNull();
});