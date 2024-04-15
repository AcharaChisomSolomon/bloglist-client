import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

test('calls the event handler it received as props with the right details when a new blog is created', async () => { 
    const createBlog = vi.fn();
    const blog = {
        title: 'test title',
        url: 'test url',
        author: 'test author'
    };

    const component = render(
        <BlogForm createBlog={createBlog} blogFormVisible={true} />
    );

    const titleInput = component.container.querySelector('input[name="Title"]');
    const authorInput = component.container.querySelector('input[name="Author"]');
    const urlInput = component.container.querySelector('input[name="URL"]');

    const formButton = component.container.querySelector('button[type="submit"]');

    await userEvent.type(titleInput, blog.title);
    await userEvent.type(authorInput, blog.author);
    await userEvent.type(urlInput, blog.url);
    await userEvent.click(formButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0]).toEqual(blog);
});