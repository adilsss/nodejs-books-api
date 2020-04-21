const db = require('../models');
const Book = db.books;

exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    const book = new Book({
            title: req.body.title,
            author: req.body.author,
            published: req.body.published,
            publisher: req.body.publisher,
            pages: req.body.pages,
            description: req.body.description,
            img: req.body.img,
            link: req.body.link,
            language: req.body.language,
            pLanguage: req.body.pLanguage,
    });

    book
        .save(book)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Book.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving books."
        });
      });
  };

exports.findByLanguage = (req, res) => {
    const pLanguage = req.query.pLanguage;
    var condition = pLanguage ? { pLanguage: { $regex: new RegExp(pLanguage), $options: "i" } } : {};

    Book.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving books."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Book.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: 'Cannot find book with id=' + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: 'Error while retrieving Book with id=' + id });
        });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Book.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Book with id=${id}`
                });
            } else res.send({ message: "Book was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Book with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Book.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Book with id=${id}`
                });
            } else {
                res.send({
                    message: "Book was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Book with id=" + id
            });
        });
};
