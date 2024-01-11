describe('main', () => {
  beforeEach(() => {
    cy.visit('test.html');
  });
  it('does basic actions', () => {
    cy.get('#insertBesluit').click();
  });

  it('typing in the editor works as expected', () => {
    cy.get(`button[title='Bold']`).first().click();
    cy.get('.say-editor__inner').type('Hello world!');
    cy.get('.say-editor__inner').should(
      'have.html',
      '<p><strong>Hello world!</strong></p>'
    );
  });
});
