describe('main', () => {
  it('does basic actions', () => {
    cy.viewport(1280, 720);

    cy.visit('test.html');
    cy.get('#insertBesluit').click();
  });

  it('typing in the editor works as expected', () => {
    cy.viewport(1280, 720);

    cy.visit('test.html');

    cy.get(`button[title='Bold']`).first().click();
    cy.get('.say-editor__inner').type('Hello world!');
    cy.get('.say-editor__inner').should(
      'have.html',
      '<p><strong>Hello world!</strong></p>'
    );
  });
});
