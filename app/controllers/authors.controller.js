const db = require('../models');
const Author = db.authors;

exports.create = (req, res) => {
    if (!req.body.fullName) {
        res.status(400).send({ message: "Поля не могут быть пустыми!" });
        return;
    }

    const author = new Author({
        fullName: req.body.fullName,
        img: req.body.img,
        birthYear: req.body.birthYear,
        country: req.body.country,
        bio: req.body.bio,
        bibliography: req.body.bibliography
    });

    author
        .save(author)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Произошла ошибка при создании автора!"
            });
        });
};

exports.findAll = (req, res) => {
    const fullName = req.query.fullName;
    var condition = fullName ? { fullName: { $regex: new RegExp(fullName), $options: "i" } } : {};

    Author.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Произошла ошибка при получении авторов!"
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Author.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: 'Невозможно найти автора с таким id= ' + id });
            else res.send(data);
        })
        .catch(err => {
            res.status(500)
                .send({ message: 'Произошла ошибка!' })
        });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Поля не могут быть пустыми'
        });
    }

    const id = req.params.id;

    Author.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Невозможно обновить автора с id=${id}`
                });
            } else res.send({ message: 'Автор успешно обновлен!' });
        })
        .catch(err => {
            res.status(500).send({
                message: 'Произошла ошибка при обновлении автора с id= ' + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Author.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Невозможно удалить автора с id=${id}`
                });
            } else {
                res.send({
                    message: "Автор был успешно удален!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Невозможно удалить автора с id=" + id
            });
        });
};