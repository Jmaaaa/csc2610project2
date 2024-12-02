require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

const app = express();

const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString);
const database = mongoose.connection


database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.use(express.json());
app.use('/api', routes)

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { title: 'My First EJS Page' });
});

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})