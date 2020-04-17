module.exports = app => {
    const authors = require("../controllers/authors.controller.js");

    var router = require("express").Router();

    router.post("/", authors.create);

    router.get("/", authors.findAll);

    router.get("/:id", authors.findOne);

    router.put("/:id", authors.update);

    router.delete("/:id", authors.delete);

    app.use('/api/authors', router);
};