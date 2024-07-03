describe('Course Enrollment Journey', () => {
  it('navigates through courses and uploads a file', () => {
    // Visit the home page
    cy.visit('/');

    // Click the 'Enrolled' button
    cy.contains('button', 'Enrolled').click();

    // Assert the redirection to '/enrolled'
    cy.url().should('include', '/enrolled');

    // Click on a course (assuming courses have a common class or identifier)
    cy.get('.course-item').first().click(); // Adjust the selector based on actual implementation

    // Assert redirection to course detail page '/enrolled/{id}'
    cy.url().should('include', '/enrolled/');

    // Click on a section (assuming sections have a common class or identifier)
    cy.get('.section-item').first().click(); // Adjust the selector

    // Assert redirection to section page '/enrolled/{id}/section/{id}'
    cy.url().should('include', '/section/');

    // Click on a lesson (assuming lessons have a common class or identifier)
    cy.get('.lesson-item').first().click(); // Adjust the selector

    // Assert redirection to lesson page '/enrolled/{id}/section/{id}/lesson/{id}'
    cy.url().should('include', '/lesson/');

    // Click on the 'Upload file' button
    cy.contains('button', 'Upload file').click();

    // Handle file upload (replace 'path/to/file' with actual file path)
    cy.get('input[type="file"]').attachFile('path/to/file');

    // Click on the 'Approve' button after file upload
    cy.contains('button', 'Approve').click();

    // Add any necessary assertions to verify the completion of the process
  });
});
