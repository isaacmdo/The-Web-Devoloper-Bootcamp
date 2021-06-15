const Product = require('./model/product.js')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/farmStand', {
  useNewUrlParser: true, 
  useUnifiedTopology: true
})
.then(res => {
  console.log('MONGO CONNECT');
})
.catch((e) => {
  console.log(e);
  console.log('deu um erro')
});

// const p  = new Product({
//   name: 'Ruby Grapefruit',
//   price: 1.99,
//   category: 'fruit'
// })

// p.save().then(res => {
//   console.log(res)
// }).catch(e => {
//   console.log(e)
// });

const seedProducts = [
  {
    name: 'manga',
    price: 1.50,
    category: 'fruit'
  },
  {
    name: 'pera',
    price: 1.20,
    category: 'fruit'
  },
  {
    name: 'abacate',
    price: 1.12,
    category: 'fruit'
  },
  {
    name: 'brocolis',
    price: 1.12,
    category: 'vegetable'
  },
]

Product.insertMany(seedProducts)
.then(res => {
  console.log(res)
})
.catch(e => {
  console.log(e)
})