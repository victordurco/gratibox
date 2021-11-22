/* eslint-disable no-undef */
/// <reference types="cypress" />
beforeEach(() => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:4000/sign-up',
    body: {
      email: 'usuario@email.com',
      password: 'senha_super_secreta',
      name: 'teste',
    },
    failOnStatusCode: false,
  });
});

describe('Login', () => {
  it('should login successfully', () => {
    cy.visit('http://localhost:3000/entrar');
    cy.get('input[type=email]').type('usuario@email.com');
    cy.get('input[type=password]').type('senha_super_secreta');
    cy.contains('button', 'Login').click();
    cy.url().should('equal', 'http://localhost:3000/planos');
  });
});
