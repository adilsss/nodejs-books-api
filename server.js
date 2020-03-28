const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./app/models');

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
    })
    .catch(err => {
        console.log('Connection failed!', err);
        process.exit();
    })

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true} ));

app.get('/', (req, res) => {
    res.json({ message: 'zdravie zhelau' });
})

require('./app/routes/books.routes')(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})