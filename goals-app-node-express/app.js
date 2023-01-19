const express = require('express');
const { errorHandler } = require('./middleware/errorMiddleware');
const dotenv = require('dotenv').config();
const port = process.env.PORT;
const mongoDb = require('./config/db')
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(cors());

app.use('/api/goals', require('./routes/goals'));
app.use('/api/auth', require('./routes/user'));

app.use(errorHandler);

mongoDb().then(() => {
    app.listen(port, () => {
        try {
            console.log('App Running at ' + port);
        } catch (error) {
            console.log(error);
        }
    });
});
