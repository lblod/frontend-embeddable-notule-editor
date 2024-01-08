describe('main', () => {
  it('the citation modal should load correctly', () => {
    cy.viewport(1280, 720);

    cy.visit('test.html');
    cy.get('.say-editor-hints__insert').contains('button', 'Insert').click();
    cy.get('.say-editor-hints__insert')
      .contains('button', 'Insert reference')
      .click();
    cy.get('.citaten--main-container')
      .find('.au-c-main-container__content')
      .find('ul')
      .as('list');
    cy.get('@list').children('li').should('have.length.above', 1);
  });

  it('filtering citations works', () => {
    cy.viewport(1280, 720);

    cy.visit('test.html');
    cy.get('.say-editor-hints__insert').contains('button', 'Insert').click();
    cy.get('.say-editor-hints__insert')
      .contains('button', 'Insert reference')
      .click();
    cy.get('.citaten--main-container').find('#searchtermexpanded').type('bos');
    cy.get('.citaten--main-container')
      .find('.au-c-main-container__content')
      .find('ul')
      .as('list');
    cy.get('@list')
      .children('li')
      .each((el) => {
        cy.wrap(el).contains('bos', { matchCase: false });
      });
  });
});
