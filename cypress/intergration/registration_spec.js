describe('Registration Tests', () => {
  it('Should register a user and redirect to main page', () => {
    cy.visit('/sign-up'); // Replace with your registration page URL

    cy.get('input[name="firstName"]').type('Alex');
    cy.get('input[name="lastName"]').type('Green');
    cy.get('input[name="login"]').type('some@gmail.com');
    cy.get('input[name="password"]').type('password');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/'); // Assuming '/main' is the main page after registration
  });

  // Tests for empty field validation
  it('Should show a message for empty Name field', () => {
    cy.visit('/register');
    cy.get('input[name="lastName"]').type('Green');
    cy.get('input[name="login"]').type('some@gmail.com');
    cy.get('input[name="password"]').type('password');
    cy.get('button[type="submit"]').click();

    cy.get('input[name="firstName"]').then(($input) => {
      expect($input[0].validationMessage).to.eq('Fill in this field');
    });
  });

  it('Should show a message for empty Surname field', () => {
    cy.visit('/register');
    cy.get('input[name="firstName"]').type('Alex');
    cy.get('input[name="login"]').type('some@gmail.com');
    cy.get('input[name="password"]').type('password');
    cy.get('button[type="submit"]').click();

    cy.get('input[name="lastName"]').then(($input) => {
      expect($input[0].validationMessage).to.eq('Fill in this field');
    });
  });

  it('Should show a message for empty Email field', () => {
    cy.visit('/register');
    cy.get('input[name="firstName"]').type('Alex');
    cy.get('input[name="lastName"]').type('Green');
    cy.get('input[name="password"]').type('password');
    cy.get('button[type="submit"]').click();

    cy.get('input[name="login"]').then(($input) => {
      expect($input[0].validationMessage).to.eq('Fill in this field');
    });
  });

  it('Should show a message for empty Password field', () => {
    cy.visit('/register');
    cy.get('input[name="firstName"]').type('Alex');
    cy.get('input[name="lastName"]').type('Green');
    cy.get('input[name="login"]').type('some@gmail.com');
    cy.get('button[type="submit"]').click();

    cy.get('input[name="password"]').then(($input) => {
      expect($input[0].validationMessage).to.eq('Fill in this field');
    });
  });
});
