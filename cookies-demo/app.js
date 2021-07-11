const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser('thisismysecret'));

app.get('/greet', (req, res) => {
  const { name = 'No-Name' } = req.cookies;
  res.send(`Hey there, ${name}`);
});

app.get('/setname', (req, res) => {
  res.cookie('name', 'stevie chicks');
  res.send('ok sent you a cookie')
});

app.get('/signedcookie', (req, res) => {
  res.cookie('fruit', 'grape', { signed: true })
  res.send('Cookie')
});

app.get('/verifycookies', (req, res) => {
  console.log(req.signedCookies);
  res.send(req.signedCookies);
})


app.listen(3000, () => {
  console.log('serving')
})