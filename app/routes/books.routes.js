module.exports = app => {
    const books = require("../controllers/books.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", books.create);

    // Retrieve all Tutorials
    router.get("/", books.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", books.findOne);

    // Update a Tutorial with id
    router.put("/:id", books.update);

    // Delete a Tutorial with id
    router.delete("/:id", books.delete);

    app.use('/api/books', router);
};