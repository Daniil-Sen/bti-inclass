describe('empty spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})


describe('login / logout flow specification', () => {

  // Test 1 Protected Route /profile-sg
  it('cannot navigate to /profile-sg without being logged in', () => {
    cy.visit("/profile-sg")
    .url().should('include', "/login");
  });


  // Test 2 Rejecting Invalid Github Users
  it('rejects a login attempt by an invalid github user: !!!', () => {
    cy.visit("/login")
    .get('input[name="username"]').type("!!!").type("{enter}")
    .url().should('include', "/login");
  });


  // Test 3 Granting Access to Valid Github Users​
  it('successfully authenticates a valid github user: test-account and logs out', () => {
    cy.visit("/login")
    .get('input[name="username"]').type("test-account").type("{enter}") // "test-account" is a valid GitHub user account
    .url().should('include', '/profile-sg')
    .get("nav").contains("Logout").click()
    .url().should('include', "/login");
  });

});

// describe('check Not Found (404)', () => {
//   it('should return status 404 when visiting /unknown', () => {
//     // See Request: https://docs.cypress.io/api/commands/request and
//     // Its: https://docs.cypress.io/api/commands/its for more information regarding this test
//     cy.request({ url: '/unknown', failOnStatusCode: false }).its('status').should('equal', 404);
//   });
// });