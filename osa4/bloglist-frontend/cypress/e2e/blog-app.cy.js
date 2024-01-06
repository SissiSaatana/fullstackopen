describe('Blog app ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/testing/reset')    
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    const user2 = {
      name: 'Luukkainen',
      username: 'tester',
      password: 'passu'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user2) 
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      // ...
      cy.get('input[name="username"]').type('mluukkai')
      cy.get('input[name="password"]').type('salainen')
      cy.get('#login-button').click()
      
      cy.contains('Matti Luukkainen')
      cy.contains('Logout')
    })

    it('fails with wrong credentials', function() {
      cy.get('input[name="username"]').type('mluukkai')
      cy.get('input[name="password"]').type('wrong')
      cy.get('#login-button').click()
      
      cy.contains('Wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('input[name="username"]').type('mluukkai')
      cy.get('input[name="password"]').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.get('#show-button').click()
      cy.get('input[name="title"]').type('test title')
      cy.get('input[name="author"]').type('test author')
      cy.get('input[name="url"]').type('https://test.com')
      cy.get('#submit-new-blog').click()
      
      cy.contains('test title')
      cy.contains('view').click()
      cy.contains('test author')
      cy.contains('https://test.com')
      cy.contains('like').click()
      cy.contains('Likes 1')
    })

    it('Blog can be liked', function() {
      cy.get('#show-button').click()
      cy.get('input[name="title"]').type('test title')
      cy.get('input[name="author"]').type('test author')
      cy.get('input[name="url"]').type('https://test.com')
      cy.get('#submit-new-blog').click()
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('Likes 1')
    })

    it('Blog can be removed', function() {
      cy.get('#show-button').click()
      cy.get('input[name="title"]').type('test title')
      cy.get('input[name="author"]').type('test author')
      cy.get('input[name="url"]').type('https://test.com')
      cy.get('#submit-new-blog').click()
      cy.contains('view').click()
      cy.contains('Remove').click()
      cy.get('.blog').should('not.exist')
    })

    it('Blog can only be removed by creator',  function() {
      cy.get('#show-button').click()
      cy.get('input[name="title"]').type('test title')
      cy.get('input[name="author"]').type('test author')
      cy.get('input[name="url"]').type('https://test.com')
      cy.get('#submit-new-blog').click()
      cy.contains('view').click()
      
      cy.contains('Logout').click()
      cy.get('input[name="username"]').type('tester')
      cy.get('input[name="password"]').type('passu')
      cy.get('#login-button').click()
      cy.get('.remove-blog-button').should('not.exist')
    })

    it('Blogs are sorted via likes',  function() {
      cy.get('#show-button').click()
      cy.get('input[name="title"]').type('test title')
      cy.get('input[name="author"]').type('test author')
      cy.get('input[name="url"]').type('https://test.com')
      cy.get('#submit-new-blog').click()
      cy.get('input[name="title"]').focus().clear()
      cy.get('input[name="author"]').focus().clear()
      cy.get('input[name="url"]').focus().clear()
      
      cy.get('input[name="title"]').type('other title')
      cy.get('input[name="author"]').type('other author')
      cy.get('input[name="url"]').type('https://other.com')
      cy.get('#submit-new-blog').click()
      
      
      cy.get('.show-blog-button').eq(1).click()
      cy.get('.like-button').eq(1).click()
      
      cy.get('.blog').eq(0).should('contain', 'other title')

      cy.get('.show-blog-button').eq(1).click()
      cy.get('.like-button').eq(1).click()
      cy.get('.like-button').eq(1).click()
      cy.get('.blog').eq(0).should('contain', 'test title')
    })

  })
})