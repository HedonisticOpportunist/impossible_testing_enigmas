describe("The Internet Heroku App Tests", () => {
  let url = "https://the-internet.herokuapp.com/";
  it("verifies that the correct text is displayed after clicking the Start button", () => {
    // ARRANGE
    cy.visit(url + "/dynamic_loading/2");

    // ACT
    // First, get the button, then click it.
    cy.get("button").contains("Start").click();

    // ASSERT
    // Timeout added as the text takes a while to appear.
    cy.contains("h4", "Hello World!", { timeout: 10000 }).should("be.visible");
  });

  it("verifies the number of nested div siblings under the Siblings header", () => {
    // ARRANGE - ACT
    cy.visit(url + "/large");

    // ASSERT
    cy.url().should("include", "/large");
    // This page contains 150 elements, as each number contains 3 different instances.
    // i.e. 1.1, 1.2, 1.3 ...
    cy.get("#siblings")
      .find("div")
      .should("have.length", 50 * 3); // Not writing 150 directly for better understanding.
  });

  it("traverses the challenging DOM table correctly", () => {
    // ARRANGE - ACT
    cy.visit(url + "/challenging_dom");

    // ASSERT

    // The value text value of the Third Row of the "Diceret" Column. //
    cy.get("table")
      .find("tr") //Get the table rows.
      .eq(3) // Get the 3rd row.
      .find("td") // Get the table data cells.
      .eq(5) // Get the 5th cell, which is under the "Diceret" column.
      .should("have.text", "Phaedrum2");

    // The total number of Cells in the table, not including the Header row. //
    cy.get("table")
      .find("tr") //Get the table rows.
      .not(":first") // Exclude the first row, which is the header.
      .find("td") // Get the table data cells.
      .should("have.length", 7 * 10); // 7 columns * 10 data rows = 70 cells.

    // Each value in the "Amet" column //
    cy.get("table")
      .find("td") // Get the table data cells.
      .eq(4) // Get the cells under the "Amet" column.
      .each(($el) => {
        // Iterate through each cell.
        cy.wrap($el)
          .should("match", "td") // Ensure it's a table data cell.
          .should("contain", "Consequuntur") // Ensure each cell contains the text "Consequuntur".
          .and("not.be.empty"); // Ensure the cell is not empty.

        // The Coordinates of “Definiebas7” and “Iuvaret7” within the table. //
        cy.get("table")
          .find("tr") //Get the table rows.
          .eq(8) // Get the 8th row. (Counting starts from 0).
          .find("td") // Get the table data cells.
          .eq(0) // Get the 0th cell which contains "Iuvaret7".
          .should("have.text", "Iuvaret7") // Verify it contains "Iuvaret7".
          // Next step is repeated 3 times to reach "Definiebas7".
          .next() // Move to the next sibling cell.
          .next() // Move to the next sibling cell.
          .next() // Move to the next sibling cell.
          .should("have.text", "Definiebas7"); // Verify it contains "Definiebas7".
      });
  });

  it("verifies the clicking the green button changes the values of all buttons", () => {
    // ARRANGE
    cy.visit(url + "/challenging_dom");
    let values_array = ["bar", "qux", "baz", "foo"]; // Values each of the buttons can have.
    let initial_values = [];
    let new_values = [];

    cy.get(".button").each(($el) => {
      cy.wrap($el) // Wrap elements below into chainable Cypress objects.
        .invoke("text") // Get the text element of each button.
        .then((text) => {
          initial_values.push(text); // Store the initial button values.
        });
    });

    // ACT
    cy.get(".button.success").click(); // Click the green button.

    // ASSERT
    cy.get(".button")
      .each(($el) => {
        cy.wrap($el) // Wrap elements below into chainable Cypress objects.
          .invoke("text") // Get the text element of each button.
          .then((text) => {
            new_values.push(text); // Store the new button values.
          });
      })
      .then(() => {
        // Compare initial and new values against each other.
        expect(initial_values).to.not.equal(new_values); // Ensure the values have changed.
        // Ensure all new values are within the expected set of values.
        new_values.forEach((value) => {
          expect(values_array).to.include(value);
        });
      });
  });
});
