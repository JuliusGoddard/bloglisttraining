describe("Blog ", function() {
  beforeEach(function() {
    cy.login({ username: "mluukkai", password: "salainen" });
  });

  it("front page can be opened", function() {
    cy.visit("http://localhost:3000");
    cy.contains("blogs");
  });

  it("login form can be opened", function() {
    cy.visit("http://localhost:3000");
    cy.contains("log in").click();
  });

  it.only("login fails with wrong password", function() {
    cy.contains("log in").click();
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();
  });

  describe("when logged in", function() {
    beforeEach(function() {
      cy.contains("log in").click();
      cy.get("#username").type("Allah");
      cy.get("#password").type("exo");
      cy.get("#login-button").click();

      cy.get(".error").contains("wrong credentials");

      cy.get("html").should("not.contain", "Matti Luukkainen logged in");
    });
    it("a new blogpost can be created", function() {
      beforeEach(function() {
        cy.createBlogpost({
          title: "Another Note",
          author: "A.J.S Mann",
          url: "www.wgg.com"
        });
      });
    });
  });
});
