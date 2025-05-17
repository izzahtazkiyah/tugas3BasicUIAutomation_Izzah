export function addEntitlement(employeeName) {
  cy.contains("Leave").click();
  cy.contains("Entitlements").click();
  cy.contains("Add Entitlements").click();

  cy.get(".oxd-autocomplete-text-input > input").type(employeeName);
  cy.wait(1000);
  cy.get(".oxd-autocomplete-dropdown > *").first().click();

  cy.get('input[placeholder="Type for hints..."]').last().type("Annual");
  cy.wait(1000);
  cy.get(".oxd-autocomplete-dropdown > *").first().click();

  cy.get('input[type="number"]').clear().type("10");
  cy.get('button[type="submit"]').click();
}
