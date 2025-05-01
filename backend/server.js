const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require("cors");
require("reflect-metadata");
dotenv.config();

const connectDB = require('./src/config/database');
const port = process.env.PORT || 5001;

const apiRoutes = require('./src/routes/api'); 

app.use(cors());
app.use((req, res, next) => {
    if (req.is('application/json')) {
        express.json()(req, res, next);
    } else {
        next();
    }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

connectDB().then(() => {
    app.listen(port, function () {
        console.log(`Server is running on port ${port}`);
    })
})


app.use('/api', apiRoutes)

app.get('/', function (req, res) {
    res.end('Wellcome to NodeJs Express')
})

