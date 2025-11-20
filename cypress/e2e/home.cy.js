/* eslint-disable no-undef */
const options = {
  viewportHeight: 1240,
  viewportWidth: 1024,
};

describe("Home Page", options, () => {
  it("should load the home page successfully", () => {
    cy.visit("/");
    cy.contains("h1", "Olá, sou o Bruno Pulis");
  });
});
