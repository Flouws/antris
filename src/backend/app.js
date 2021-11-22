const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/', express.static(path.join(__dirname, '../../dist')));

const appRoute = require('./routes/');
app.use('/api/v1/', appRoute);

const port = process.env.APP_PORT || 8080;
app.listen(port, ()=>{
  console.log(`Server is running on port ${port}.`);
});
