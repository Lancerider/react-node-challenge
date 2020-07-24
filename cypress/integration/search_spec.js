describe("Searching in Get on Board", () => {
  it("Allows to search accumulatively", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Search jobs");
    cy.contains("Term");

    cy.get("#term")
      .type("React Node Concierge")
      .should("have.value", "React Node Concierge");

    cy.get("button").contains("Search").click();
    cy.contains("...searching");
    cy.get(".search-result").contains(
      "Full-Stack React/Node.js by Concierge by Get on Board"
    );

    cy.get("#term").clear().type("React Node");
    cy.get("button").contains("Search").click();

    cy.get(".search-result > :nth-child(1) > button").click();
    cy.get(".search-result > :nth-child(1) > span").should(
      "have.class",
      "favorite"
    );

    cy.wait(1000);

    cy.get("button").contains("Clear").click();
    cy.get(".search-result").should("not.be.visible");
  });
});
