const express = require('express')
const bodyParser = require('body-parser');
const router = require('./router/router');

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', router);

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`))