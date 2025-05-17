export function requestLeave(startDate, endDate) {
  cy.contains("Leave").click();
  cy.contains("Apply").click();

  cy.get('input[placeholder="Type for hints..."]').type("Annual");
  cy.wait(1000);
  cy.get(".oxd-autocomplete-dropdown > *").first().click();

  cy.get('input[placeholder="yyyy-mm-dd"]').first().type(startDate);
  cy.get('input[placeholder="yyyy-mm-dd"]').last().type(endDate);
  cy.get('button[type="submit"]').click();
}

export function approveLeave(employeeName) {
  cy.contains("Leave").click();
  cy.contains("Leave List").click();

  cy.get('input[placeholder="Type for hints..."]').type(employeeName);
  cy.wait(1000);
  cy.get(".oxd-autocomplete-dropdown > *").first().click();

  cy.get('button[type="submit"]').click();
  cy.get('input[type="checkbox"]').first().click();
  cy.contains("Approve").click();
}
