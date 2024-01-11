describe('citation-plugin', () => {
  beforeEach(() => {
    cy.visit('test.html');

    cy.get('.say-editor-hints__insert').contains('button', 'Insert').click();

    cy.get('.say-editor-hints__insert')
      .contains('button', 'Insert reference')
      .click();

    cy.get('.citaten--main-container')
      .find('#searchtermexpanded')
      .as('search-field');

    cy.get('.citaten--main-container')
      .find('.au-c-main-container__content')
      .find('ul')
      .as('citation-list');
  });

  it('the citation modal should load correctly', () => {
    cy.get('@citation-list').children('li').should('have.length.above', 1);
  });

  it('filtering citations works', () => {
    cy.get('@search-field').type('bos');

    cy.get('@citation-list')
      .children('li')
      .each((el) => {
        cy.wrap(el).contains('bos', { matchCase: false });
      });
  });
});
