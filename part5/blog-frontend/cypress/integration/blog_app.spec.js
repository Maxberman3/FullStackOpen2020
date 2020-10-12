const fillAndSubmitBlogForm= function (){
  cy.contains('Submit new blog').click()
  cy.get('#Title').type('Testing Testing Shoot Me Pls')
  cy.get('#Author').type('A very tired tester')
  cy.get('#Url').type('www.test.com')
  cy.get('#blog-submit').click()
}

describe('Blog app', function () {
  beforeEach(function (){
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
        name: 'Test Mctester',
        username: 'root',
        password: 'sekret'
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('login form is shown', function(){
    cy.get('#Username').parent().contains('username')
    cy.get('#Password').parent().contains('password')
  })
  describe('Login', function (){
    it('succeeds with correct credentials', function() {
      cy.get('#Username').type('root')
      cy.get('#Password').type('sekret')
      cy.get('#login-button').click()
      cy.get('html').contains('is logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#Username').type('root')
      cy.get('#Password').type('blargh')
      cy.get('#login-button').click()
      cy.get('html').contains('Incorrect Credentials')
    })
  })
  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({username:'root',password:'sekret'})
      // cy.visit('http://localhost:3000')
    })

    it('A blog can be created', function() {
      cy.contains('Submit new blog').click()
      cy.get('#Title').type('Testing Testing Shoot Me Pls')
      cy.get('#Author').type('A very tired tester')
      cy.get('#Url').type('www.test.com')
      cy.get('#blog-submit').click()
      cy.get('html').contains('Testing Testing Shoot Me Pls')
    })
    it('The blog can be liked', function(){
      fillAndSubmitBlogForm()
      cy.contains('view').click()
      cy.get('.likeButton').click()
      cy.get('html').contains('likes 1')
    })
    it('The blog can be removed', function(){
      fillAndSubmitBlogForm()
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.get('html').should('not.contain', 'Testing Testing Shoot Me Pls')
    })
  })
})
