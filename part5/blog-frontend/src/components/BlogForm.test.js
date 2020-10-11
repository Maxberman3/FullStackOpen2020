import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('Blog form submits with correct information', ()=>{
  const submitBlog=jest.fn().mockName('submitBlog')
  const component = render(<BlogForm addBlog={submitBlog}/>)
  const form = component.container.querySelector('form')
  const title=component.container.querySelector('#Title')
  const author= component.container.querySelector('#Author')
  const url= component.container.querySelector('#Url')
  // console.log(title)
  fireEvent.change(title, {
    target: { value: 'testTitle' }
  })
  fireEvent.change(author, {
    target: { value: 'testAuthor' }
  })
  fireEvent.change(url, {
    target: { value: 'www.test.com' }
  })
  fireEvent.submit(form)
  //
  expect(submitBlog.mock.calls).toHaveLength(1)
  expect(submitBlog.mock.calls[0][0].title).toBe('testTitle')
})
