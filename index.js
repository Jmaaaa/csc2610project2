require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

const app = express();

const mongoString = process.env.DATABASE_URL + 'data'
mongoose.connect(mongoString);
const database = mongoose.connection


database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.use(express.json());
app.use(express.urlencoded());
app.use('/api', routes)

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.redirect('/availability');
});

app.get('/availability', (req, res) => {
    res.render('availability', { page:'availability' });
});

app.get('/admin', (req, res) => {
    res.render('admin', { page:'admin' });
});



app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})