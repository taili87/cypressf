const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    "baseUrl": "http://localhost:3000",
    "viewportHeight": 500,
    "viewportWidth": 700,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
