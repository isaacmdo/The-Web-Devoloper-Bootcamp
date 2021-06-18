const express = require('express');
const app = express();
const morgan = require('morgan');
app.listen(3001, () =>{
  console.log('connect');
});

//morgan is a middleware use in app.use, because express().use is a middleware in node
app.use(morgan('dev'));

//basic autentication for explain who to use a middleware on node
const middlewareAuthValidation = (req, res, next) => {
  const { password } = req.query;
  if(password === '123password'){
    next();
  }
  throw new Error('password required!')
}


app.get('/secret', middlewareAuthValidation, (req, res) => {
  res.send('I use headphone without sounds in the bus, because i not dont want talk with people')
});

