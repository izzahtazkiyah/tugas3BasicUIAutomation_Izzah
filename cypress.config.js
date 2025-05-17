const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    screenshotOnRunFailure: true,
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: false,
  },
  env: {
    USERNAME: "Admin",
    PASSWORD: "admin123",
    BASE_URL: "https://opensource-demo.orangehrmlive.com/web",
  },
});
