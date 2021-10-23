/// <reference types="cypress" />

describe("navigation and pages", () => {
  describe("terms and conditions", () => {
    it("accepts the terms and conditions dialog", () => {
      cy.visit("/calculation");

      cy.findByText("Accept").click();

      cy.get("#PROJECT_NAME").type("User is now able to input information in form");
    });

    it("navigates and displays terms and conditions page", () => {
      cy.visit("/login");

      cy.findByText("Terms and Conditions").click();

      cy.findByText("TDM Calculator User Terms and Conditions").should("be.visible");
    });
  });

  it("navigates to about page and displays release number", () => {
    cy.visit("/login");

    cy.findByText("About").click();

    cy.findByText(/About the TDM Calculator/i).should("be.visible");
    cy.findByText(/What does TDM mean?/i).should("be.visible");

    cy.findByText(/Release #: [0-9]+\.[0-9]+\.[0-9]+/).should("be.visible");
  });

  it("navigates to public comment page", () => {
    cy.visit("/login");

    cy.findByText("Public Comment").click();

    cy.findByText(/Public Comment Form/i).should("be.visible");
    cy.findByText("Submit").should("be.visible");
  });

  it("navigates to privacy policy page", () => {
    cy.visit("/login");

    cy.findByText("Privacy Policy").click();

    cy.findByText(/Overview/i).should("be.visible");
    cy.findByText(/The personal information we collect/i).should("be.visible");
  });

  it("navigates to login page", () => {
    cy.visit("/about");

    cy.findByText("Login").click();

    cy.findByText(/Please sign into your account to save progress/i).should("be.visible");
  });
});
