import { employee, leave } from "../support/data/employee";

describe("Tugas 3 - UI Automation OrangeHRM", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env("BASE_URL")}/auth/login`);
  });

  it("3.1 B Positive", () => {
    cy.get('input[name="username"]').type(Cypress.env("USERNAME"));
    cy.get('input[name="password"]').type(Cypress.env("PASSWORD"));
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/dashboard/index");

    cy.contains("PIM").click();
    cy.contains("Add Employee").click();
    cy.url().should("include", "/pim/addEmployee");

    cy.get('input[name="firstName"]').type(employee.firstName);
    cy.get('input[name="lastName"]').type(employee.lastName);

    cy.contains("Employee Id")
      .closest(".oxd-input-group")
      .within(() => {
        cy.get("input").clear().type(employee.employeeID);
      });

    cy.get('button[type="submit"]').click();

    cy.wait(8000);
    cy.screenshot("Tambah_Karyawan_Berhasil");
  });

  it("3.1 B Helper Positive", () => {
    cy.get('input[name="username"]').type(Cypress.env("USERNAME"));
    cy.get('input[name="password"]').type(Cypress.env("PASSWORD"));
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/dashboard/index");

    cy.contains("PIM").click();
    cy.contains("Employee List").click();

    cy.get("input[placeholder='Type for hints...']")
      .first()
      .type(`${employee.firstName} ${employee.lastName}`, { delay: 100 });

    cy.contains("button", "Search").click();

    cy.get(".oxd-table-body")
      .should("contain.text", employee.firstName)
      .and("contain.text", employee.lastName);

    cy.screenshot("Temukan_Karyawan_Berhasil");
  });

  it("3.1 B Negative", () => {
    cy.get('input[name="username"]').type(Cypress.env("USERNAME"));
    cy.get('input[name="password"]').type(Cypress.env("PASSWORD"));
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/dashboard/index");

    cy.contains("PIM").click();
    cy.contains("Add Employee").click();
    cy.url().should("include", "/pim/addEmployee");

    cy.get('input[name="firstName"]').clear();
    cy.get('input[name="lastName"]').clear();

    cy.get('button[type="submit"]').click();

    cy.wait(1000);
    cy.screenshot("Tambah_Karyawan_Gagal");
  });

  it("3.1 C Positive", () => {
    cy.get('input[name="username"]').type(Cypress.env("USERNAME"));
    cy.get('input[name="password"]').type(Cypress.env("PASSWORD"));
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/dashboard/index");

    cy.contains("Admin").click();
    cy.contains("button", "Add").click();

    cy.get(".oxd-select-wrapper").eq(0).click();
    cy.get(".oxd-select-dropdown")
      .should("be.visible")
      .contains(/^ESS$/)
      .click();

    cy.get("input[placeholder='Type for hints...']")
      .first()
      .type(`${employee.firstName} ${employee.lastName}`, { delay: 100 });

    cy.get(".oxd-autocomplete-dropdown")
      .contains(`${employee.firstName} ${employee.lastName}`)
      .click();

    cy.get(".oxd-select-wrapper").eq(1).click();
    cy.get(".oxd-select-dropdown")
      .should("be.visible")
      .contains(/^Enabled$/)
      .click();

    cy.contains("Username")
      .closest(".oxd-input-group")
      .within(() => {
        cy.get("input").clear().type(employee.username);
      });

    cy.contains("Password")
      .closest(".oxd-input-group")
      .within(() => {
        cy.get("input").clear().type(employee.password);
      });

    cy.contains("Confirm Password")
      .closest(".oxd-input-group")
      .within(() => {
        cy.get("input").clear().type(employee.password);
      });

    cy.get('button[type="submit"]').click();

    cy.wait(2000);
    cy.screenshot("Tambah_Akun_Karyawan_Berhasil");
  });

  it("3.1 C Helper", () => {
    cy.get('input[name="username"]').type(Cypress.env("USERNAME"));
    cy.get('input[name="password"]').type(Cypress.env("PASSWORD"));
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/dashboard/index");

    cy.contains("Admin").click();

    cy.contains("Username")
      .closest(".oxd-input-group")
      .within(() => {
        cy.get("input").clear().type(employee.username);
      });

    cy.get('button[type="submit"]').click();

    cy.wait(5000);

    cy.get(".oxd-table-body", { timeout: 10000 }).within(() => {
      cy.contains("div[role='row']", employee.username).should("be.visible");
    });

    cy.screenshot("Temukan_Akun_Karyawan_Berhasil");
  });

  it("3.1 C Negative", () => {
    cy.get('input[name="username"]').type(Cypress.env("USERNAME"));
    cy.get('input[name="password"]').type(Cypress.env("PASSWORD"));
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/dashboard/index");

    cy.contains("Admin").click();
    cy.contains("button", "Add").click();

    cy.get(".oxd-select-wrapper").eq(0).click();
    cy.get(".oxd-select-dropdown")
      .should("be.visible")
      .contains(/^Admin$/)
      .click();

    cy.get(".oxd-select-wrapper").eq(1).click();
    cy.get(".oxd-select-dropdown")
      .should("be.visible")
      .contains(/^Enabled$/)
      .click();

    cy.contains("Username")
      .closest(".oxd-input-group")
      .within(() => {
        cy.get("input").clear();
      });

    cy.contains("Password")
      .closest(".oxd-input-group")
      .within(() => {
        cy.get("input").clear();
      });

    cy.contains("Confirm Password")
      .closest(".oxd-input-group")
      .within(() => {
        cy.get("input").clear();
      });

    cy.get('button[type="submit"]').click();

    cy.wait(2000);
    cy.screenshot("Tambah_Akun_Karyawan_Gagal");
  });

  it("3.2 B Positive", () => {
    cy.get('input[name="username"]').type(Cypress.env("USERNAME"));
    cy.get('input[name="password"]').type(Cypress.env("PASSWORD"));
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/dashboard/index");

    cy.contains("Leave").click();

    cy.contains("Entitlements", { timeout: 10000 })
      .should("be.visible")
      .click();

    cy.contains("Add Entitlements", { timeout: 10000 })
      .should("be.visible")
      .click();

    cy.contains("Individual Employee")
      .parent()
      .find("input[type='radio']")
      .check({ force: true });

    cy.get("input[placeholder='Type for hints...']")
      .first()
      .type(`${employee.firstName} ${employee.lastName}`, { delay: 1000 });

    cy.wait(1000);

    cy.get(".oxd-autocomplete-dropdown")
      .contains(`${employee.firstName} ${employee.lastName}`)
      .click();

    cy.get(".oxd-select-wrapper").eq(0).click();
    cy.get(".oxd-select-dropdown")
      .should("be.visible")
      .contains(/^CAN - Personal$/)
      .click();

    cy.get(".oxd-select-wrapper").eq(1).click();
    cy.get(".oxd-select-dropdown")
      .should("be.visible")
      .contains(/^2024-01-01 - 2024-31-12$/)
      .click();

    cy.get("label").first().click();
    cy.wait(300);

    cy.get("input.oxd-input")
      .last()
      .should("be.visible")
      .clear()
      .type(leave.entitlement);

    cy.get('button[type="submit"]').click();

    cy.wait(4000);
    cy.contains("Confirm").click();

    cy.wait(8000);
    cy.screenshot("Tambah_Cuti_Berhasil");
  });

  it("3.2 B Negative", () => {
    cy.get('input[name="username"]').type(Cypress.env("USERNAME"));
    cy.get('input[name="password"]').type(Cypress.env("PASSWORD"));
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/dashboard/index");

    cy.contains("Leave").click();

    cy.contains("Entitlements", { timeout: 10000 })
      .should("be.visible")
      .click();

    cy.contains("Add Entitlements", { timeout: 10000 })
      .should("be.visible")
      .click();

    cy.contains("Individual Employee")
      .parent()
      .find("input[type='radio']")
      .check({ force: true });

    cy.get("input[placeholder='Type for hints...']").first().clear();

    cy.get(".oxd-select-wrapper").eq(0).click();
    cy.get(".oxd-select-dropdown").contains("-- Select --").click();

    cy.get(".oxd-select-wrapper").eq(1).click();
    cy.get(".oxd-select-dropdown").contains("-- Select --").click();

    cy.get("input.oxd-input").last().clear();

    cy.get('button[type="submit"]').click();

    cy.get(".oxd-input-group__message") // ganti sesuai error UI
      .should("be.visible");

    cy.screenshot("Tambah_Cuti_Gagal");
  });

  it("3.3 B Positive", () => {
    cy.get('input[name="username"]').type(employee.username);
    cy.get('input[name="password"]').type(employee.password);
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/dashboard/index");

    cy.contains("Leave").click();
    cy.contains("Apply", { timeout: 10000 }).should("be.visible").click();

    cy.get(".oxd-select-wrapper").eq(0).click();
    cy.get(".oxd-select-dropdown").contains("CAN - Personal").click();

    cy.get("input[placeholder='yyyy-dd-mm']").eq(0).clear().type("2024-05-15");
    cy.get("input[placeholder='yyyy-dd-mm']").eq(1).clear().type("2024-05-18");

    cy.get("label").first().click();

    cy.wait(300);
    cy.get("textarea").type("Cuti karena ada keperluan keluarga");

    cy.get('button[type="submit"]').click({ force: true });

    cy.contains("Successfully Saved", { timeout: 10000 }).should("be.visible");

    cy.screenshot("Pengajuan_Cuti_Berhasil");
  });

  it("3.3 B Negative", () => {
    cy.get('input[name="username"]').type(employee.username);
    cy.get('input[name="password"]').type(employee.password);
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/dashboard/index");

    cy.contains("Leave").click();
    cy.contains("Apply", { timeout: 10000 }).should("be.visible").click();

    cy.get(".oxd-select-wrapper").eq(0).click();
    cy.get(".oxd-select-dropdown").contains("CAN - Personal").click();

    cy.get("input[placeholder='yyyy-dd-mm']").eq(0).clear();
    cy.get("input[placeholder='yyyy-dd-mm']").eq(1).clear();

    cy.get("label").first().click();

    cy.wait(300);
    cy.get("textarea").clear();

    cy.get('button[type="submit"]').click({ force: true });

    cy.contains("Required", { timeout: 10000 }).should("be.visible");

    cy.screenshot("Pengajuan_Cuti_Gagal");
  });

  it("3.3 C Positive", () => {
    cy.get('input[name="username"]').type(Cypress.env("USERNAME"));
    cy.get('input[name="password"]').type(Cypress.env("PASSWORD"));
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/dashboard/index");

    cy.contains("Leave").click();
    cy.contains("Leave List").click();

    cy.get("input[placeholder='yyyy-dd-mm']").eq(0).clear().type("2024-05-15");
    cy.get("input[placeholder='yyyy-dd-mm']").eq(1).clear().type("2024-05-18");

    cy.get("label").first().click();
    cy.wait(300);

    cy.contains("Search").click();
    cy.contains(`${employee.firstName} ${employee.lastName}`, {
      timeout: 10000,
    }).should("be.visible");

    cy.contains("Approve").click();

    cy.contains("Successfully Updated", { timeout: 10000 }).should(
      "be.visible"
    );

    cy.screenshot("Approval_Cuti_Berhasil");
  });

  it("3.3 C Negative", () => {
    cy.get('input[name="username"]').type(employee.username);
    cy.get('input[name="password"]').type(employee.password);
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/dashboard/index");

    cy.contains("Leave").click();
    cy.contains("Leave List").click();

    cy.get("input[placeholder='yyyy-dd-mm']").eq(0).clear();
    cy.get("input[placeholder='yyyy-dd-mm']").eq(1).clear();

    cy.get("label").first().click();
    cy.wait(300);

    cy.contains("Search").click();

    cy.screenshot("Approval_Cuti_Gagal");
  });

  it("3.3 D Positive", () => {
    cy.get('input[name="username"]').type(employee.username);
    cy.get('input[name="password"]').type(employee.password);
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/dashboard/index");

    cy.contains("Leave").click();
    cy.contains("My Leave").click();

    cy.get("input[placeholder='yyyy-dd-mm']").eq(0).clear().type("2024-01-01");
    cy.get("input[placeholder='yyyy-dd-mm']").eq(1).clear().type("2024-12-30");

    cy.get("label").first().click();
    cy.wait(300);

    cy.contains("Search").click();

    cy.contains(`${employee.firstName} ${employee.lastName}`, {
      timeout: 10000,
    }).should("be.visible");

    cy.get("div.oxd-table-card", { timeout: 10000 }).should("exist");
    cy.get(".oxd-table-body", { timeout: 10000 }).should("exist");

    cy.get(".oxd-table-body")
      .invoke("text")
      .then((text) => {
        expect(text).to.include(`Taken`);
      });

    cy.screenshot("Expectation_Cuti_Berhasil");
  });

    it("3.3 D Negative", () => {
      cy.get('input[name="username"]').type(employee.username);
      cy.get('input[name="password"]').type(employee.password);
      cy.get('button[type="submit"]').click();

      cy.url().should("include", "/dashboard/index");

      cy.contains("Leave").click();
      cy.contains("My Leave").click();
      for (let i = 0; i < 5; i++) {
        cy.get('div[class="oxd-table-filter"] span:nth-child(1) i:nth-child(1)').click();
      }
      cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message').should('have.text', 'Required');



      cy.screenshot("Expectation_Cuti_Gagal");
    });
});
