const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./app/models');
const Role = db.role;

const app = express();

const corsOptions = {
    origin: 'http://localhost:8081'
}

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected successfully!');
        initial();
    })
    .catch(err => {
        console.log('Connection failed!', err);
        process.exit();
    })


function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true} ));

app.get('/', (req, res) => {
    res.json({ message: 'zdravie zhelau' });
})

require('./app/routes/books.routes')(app);
require('./app/routes/authors.routes')(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})