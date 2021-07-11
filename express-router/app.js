const express = require('express');
const app = express();
const shelterRouters = require('./routes/shelters');
const dogsRouters = require('./routes/dogs');
const adminRouters = require('./routes/admin')


app.use('/admin', adminRouters);
app.use('/shelters', shelterRouters);
app.use('/dogs', dogsRouters);

app.listen(3001, () => {
  console.log('Server listen on port 3001')
})