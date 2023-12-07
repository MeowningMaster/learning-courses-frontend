describe('Login Tests', () => {
  beforeEach(() => {
    cy.visit('/login'); // adjust the URL to your application's login page
  });

  it('allows a user to log in with valid credentials', () => {
    cy.get('input[type="email"]').type('some@gmail.com');
    cy.get('input[type="password"]').type('password');
    cy.get('button[type="submit"]').click();
    // Add assertion for successful login
  });

  it('displays an error message for empty email field', () => {
    cy.get('input[type="password"]').type('password');
    cy.get('button[type="submit"]').click();
    cy.get('input[type="email"]').then(($input) => {
      expect($input[0].validationMessage).to.eq('Fill in this field');
    });
  });

  it('displays an error message for empty password field', () => {
    cy.get('input[type="email"]').type('some@gmail.com');
    cy.get('button[type="submit"]').click();
    cy.get('input[type="password"]').then(($input) => {
      expect($input[0].validationMessage).to.eq('Fill in this field');
    });
  });
});
