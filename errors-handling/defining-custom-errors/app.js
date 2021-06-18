const express = require('express');
const app = express();
const morgan = require('morgan');
app.listen(3001, () =>{
  console.log('connect');
});

app.use(morgan('dev'));

//Custom error
app.use((err, req, res, next) => {
  console.log('*****************************')
  console.log('***********ERROR*************')
  console.log('*****************************')
  res.status(500).send('oh boy, why got a error')
  next();
})


const middlewareAuthValidation = (req, res, next) => {
  const { password } = req.query;
  if(password === '123password'){
    next();
  }
  throw new Error('password required!')
}


app.get('/error', (req, res) => {
  bob.fly(); //Error create intentionally
})

app.get('/secret', middlewareAuthValidation, (req, res) => {
  res.send('I use headphone without sounds in the bus, because i not dont want talk with people')
});

