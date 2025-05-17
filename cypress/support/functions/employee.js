export function addEmployee(employee) {
  cy.contains("PIM").click();
  cy.contains("Add Employee").click();
  cy.get('input[name="firstName"]').type(employee.firstName);
  cy.get('input[name="lastName"]').type(employee.lastName);
  cy.get("input.oxd-switch-input").click();

  cy.get("label")
    .contains("Username")
    .parent()
    .find("input")
    .type(employee.username);
  cy.get("label")
    .contains("Password")
    .parent()
    .find("input")
    .type(employee.password);
  cy.get("label")
    .contains("Confirm Password")
    .parent()
    .find("input")
    .type(employee.password);

  cy.get('button[type="submit"]').click();
}
