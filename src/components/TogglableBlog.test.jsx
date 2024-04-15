import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TogglableBlog from './TogglableBlog';
import { test } from 'vitest';

describe('<TogglableBlog />', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Test Author',
        url: 'http://localhost',
        likes: 0,
        user: {
            name: 'Test User',
            username: 'testuser',
            id: '2'
        },
        id: '1'
    };
    let component;
    const handleLike = vi.fn(() => () => {
        blog.likes += 1;
    });
    const handleBlogDelete = vi.fn();
    const nameOfLoggedInUser = 'Test User';

    beforeEach(() => {
        component = render(
          <TogglableBlog blog={blog}>
            <div className='testDiv'>
              <div>{blog.url}</div>
              <div>
                likes {blog.likes}
                <button onClick={handleLike}>like</button>
              </div>
              <div>{blog.user.name}</div>
              {nameOfLoggedInUser === blog.user.name && (
                <button onClick={handleBlogDelete}>remove</button>
              )}
            </div>
          </TogglableBlog>
        ).container;
    });

    test('renders content with only title and author by default', () => {
        const div = component.querySelector('.blog');
        const hideButton = screen.queryByText('hide');
        const viewButton = screen.queryByText('view');

        expect(hideButton).toBeNull();
        expect(viewButton).toBeDefined();
        expect(div).toHaveTextContent(`${blog.title} - ${blog.author}`);
    });

    test('renders blog content when view button is clicked', () => {
        const viewButton = screen.getByText('view');
        userEvent.click(viewButton);

        const div = component.querySelector('.blog');
        const hideButton = screen.queryByText('hide');
        const testDiv = screen.queryByText(`${blog.url}`);

        expect(hideButton).toBeDefined();
        expect(testDiv).toBeDefined();
        expect(div).toHaveTextContent(`${blog.title} - ${blog.author}`);
    });

    test('hides blog content when hide button is clicked', async () => { 
        const viewButton = screen.getByText('view');
         await userEvent.click(viewButton);

        const hideButton = screen.getByText('hide');
        await userEvent.click(hideButton);

        const div = component.querySelector('.blog');
        const testDiv = screen.queryByText('blog content');
        const viewButtonAfterHide = screen.queryByText('view');

        expect(testDiv).toBeNull();
        expect(viewButtonAfterHide).toBeDefined();
        expect(div).toHaveTextContent(`${blog.title} - ${blog.author}`);
    });

    test('the like event handler is called twice when like button is clicked twice', async () => {
        const viewButton = screen.getByText('view');
        await userEvent.click(viewButton);

        const likeButton = screen.getByText('like');
        await userEvent.click(likeButton);
        await userEvent.click(likeButton);

        const div = component.querySelector('.blog');
        const likeButtonAfterLike = screen.queryByText('like');
        const likes = screen.queryByText('likes 2');

        expect(likeButtonAfterLike).toBeDefined();
        expect(likes).toBeDefined();
        expect(div).toHaveTextContent(`${blog.title} - ${blog.author}`);
    });
});