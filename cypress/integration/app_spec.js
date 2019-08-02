/// <reference types="Cypress" />
/*eslint-disable no-undef*/


describe("Weather Forecast", () => {
    beforeEach(() => {
        cy.fixture("location.json").as("fakeLocation");
        cy.get("@fakeLocation").then(fakeLocation => {
            cy.visit("http://localhost:3000/", {
                onBeforeLoad(win) {
                    cy.stub(win.navigator.geolocation, "getCurrentPosition")
                        .callsFake((cb) => cb(fakeLocation));
                }
            });
        });
    });
    it("should load the landing page", () => {

        cy.contains("Weather App");
    });
    it("should select an option from a <select> element", () => {
        const today = Cypress.moment();
        const nextWeek = today.add(6, "days");
        cy.get("#citySelect").select("London");
        cy.get("small").contains("London");
        cy.contains(nextWeek.format("M/DD/YYYY"));
        cy.get("#forecast-list").find(".col-sm-6");
        cy.get("#forecast-list").find(".col-sm-3").then($column => $column.length === 6);
        cy.get("#citySelect").select("Barcelona");
        cy.get("small").contains("Barcelona");
    });
    it("should clear the data and show nothing", () => {
        cy.get(".btn-primary").click();
        cy.get("#forecast-list").should("not.contain", ".col-sm-3");
    });
    it("should should load my current location", () => {
        cy.get(".btn-info").click();
        cy.get("small").contains("Rebrechien");
    });
});