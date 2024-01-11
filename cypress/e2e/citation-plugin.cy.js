describe('main', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);

    cy.visit('test.html', {
      // https://glebbahmutov.com/blog/cypress-tips-and-tricks/#control-navigatorlanguage
      onBeforeLoad(win) {
        Object.defineProperty(win.navigator, 'language', {
          get: cy.stub().returns('en-US').as('language'),
        });
      },
    });

    cy.get('.say-editor-hints__insert').contains('button', 'Insert').click();

    cy.get('.say-editor-hints__insert')
      .contains('button', 'Insert reference')
      .click();
  });

  it('the citation modal should load correctly', () => {
    cy.get('.citaten--main-container')
      .find('.au-c-main-container__content')
      .find('ul')
      .children('li')
      .should('have.length.above', 1);
  });

  it('filtering citations works', () => {
    cy.get('.citaten--main-container').find('#searchtermexpanded').type('bos');
    cy.get('.citaten--main-container')
      .find('.au-c-main-container__content')
      .find('ul')
      .children('li')
      .each((el) => {
        cy.wrap(el).contains('bos', { matchCase: false });
      });
  });
});

