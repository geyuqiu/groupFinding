import { entityItemSelector } from '../../support/commands';
import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('Student e2e test', () => {
  const studentPageUrl = '/student';
  const studentPageUrlPattern = new RegExp('/student(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const studentSample = {};

  let student: any;
  let group: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/groups',
      body: { description: 'Branding Licensed Valleys', topic: 'mobile', grade: 98627 },
    }).then(({ body }) => {
      group = body;
    });
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/students+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/students').as('postEntityRequest');
    cy.intercept('DELETE', '/api/students/*').as('deleteEntityRequest');
  });

  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/groups', {
      statusCode: 200,
      body: [group],
    });
  });

  afterEach(() => {
    if (student) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/students/${student.id}`,
      }).then(() => {
        student = undefined;
      });
    }
  });

  afterEach(() => {
    if (group) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/groups/${group.id}`,
      }).then(() => {
        group = undefined;
      });
    }
  });

  it('Students menu should load Students page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('student');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Student').should('exist');
    cy.url().should('match', studentPageUrlPattern);
  });

  describe('Student page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(studentPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Student page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/student/new$'));
        cy.getEntityCreateUpdateHeading('Student');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', studentPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/students',
          body: {
            ...studentSample,
            group: group,
          },
        }).then(({ body }) => {
          student = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/students+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [student],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(studentPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Student page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('student');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', studentPageUrlPattern);
      });

      it('edit button click should load edit Student page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Student');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', studentPageUrlPattern);
      });

      it('last delete button click should delete instance of Student', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('student').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', studentPageUrlPattern);

        student = undefined;
      });
    });
  });

  describe('new Student page', () => {
    beforeEach(() => {
      cy.visit(`${studentPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Student');
    });

    it('should create an instance of Student', () => {
      cy.get(`[data-cy="name"]`).type('silver hacking').should('have.value', 'silver hacking');

      cy.get(`[data-cy="group"]`).select(1);

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        student = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', studentPageUrlPattern);
    });
  });
});
