const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true, 
  useUnifiedTopology: true
})
.then(() => {
  console.log(res, 'all good')
})
.catch(e => {
  console.log(e, 'error!')
})

