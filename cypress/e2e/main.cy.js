describe('main', () => {
  it('does basic actions', () => {
    cy.viewport(1280, 720);

    cy.visit('test.html');
    cy.get('#insertBesluit').click();
  });
});
