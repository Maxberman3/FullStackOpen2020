import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

let component
let blog
let updateBlog
let deleteBlog

beforeEach(()=>{
  blog={
    title:'testBlog',
    author:'testAuthor',
    url:'www.test.com',
    likes:11
  }
  const user={
    username:'root'
  }
  blog.user=user
  updateBlog=jest.fn().mockName('updateBlog')
  deleteBlog=jest.fn().mockName('deleteBlog')
  component=render(<Blog blog={blog} user={user} updateBlog={updateBlog} deleteBlog={deleteBlog}/> )
})

test('renders author and title by default', ()=>{
  expect(component.container).toHaveTextContent(`${blog.title} - ${blog.author}`)
  expect(component.container).not.toHaveTextContent(`${blog.url}`)
  expect(component.container).not.toHaveTextContent('likes')
})

test('renders url and likes after view click', ()=>{
  const button = component.getByText('view')
  fireEvent.click(button)
  expect(component.container).toHaveTextContent(`${blog.url}`)
  expect(component.container).toHaveTextContent(`likes`)
})

test('handleLike is called for each click', ()=>{
  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)
  // component.debug()
  const likeButton = component.container.querySelector('.likeButton')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)
  expect(updateBlog).toHaveBeenCalledTimes(2)
})
