const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const AppError = require('./AppError');
const Farm = require('./model/farm.js')
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

const categories = ['fruit', 'vegetable', 'diary']

app.set ('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));

app.use((err, req, res, next) => {
  const { status = 500, message = 'error'} = err;
  res.status(status).send(message)
})


//Is function catch error for async functions
function wrapAsync(fn){
  return function(req, res, next){
    fn(req, res, next).catch(e => next(e));
  }
}

//Farm Routes

app.get('/farms', async(req, res) => {
  const farms = await Farm.find({});
  res.render('farms/index', { farms })
})

app.get('/farms/new', (req, res) => {
  res.render('farms/new')
})

app.get('/farms/:id', async(req, res) => {
  const farm = await Farm.findById(req.params.id).populate('products');
  res.render('farms/show', { farm })
})

app.delete('/farms/:id', async(req, res) => {
  const farm = await Farm.findByIdAndDelete(req.params.id);
  res.redirect('/farms');

})

app.post('/farms', async (req, res) => {
  const farm = new Farm(req.body)
  await farm.save();
  res.redirect('/farms')
})

app.get('/farms/:id/products/new', async (req, res) =>{
  const { id } = req.params;
  const farm = await Farm.findById(id);
  res.render('products/new', { categories, farm })
});

app.post('/farms/:id/products', async (req, res) => {
  const { id } = req.params;
  const farm = await Farm.findById(id);
  const { name, price, category } = req.body;
  const product = new Product({ name, price, category });
  farm.products.push(product);
  product.farm = farm;
  await farm.save();
  await product.save();
  res.redirect(`/farms/${id}`);
})


//Products Routes
app.get('/products', async (req, res) => {
  try {
    const { category } = req.query;
    if(category){
      const products = await Product.find({category});
      res.render('products/index', { products, category});
    } else {
      const products = await Product.find({});
      res.render('products/index', { products, category: 'All' });
    }
  } catch(e) {
    next(e)
  }
});

app.get('/products/new', (req, res) => {
  res.render('products/new')
})

app.post('/products', wrapAsync(async (req, res, next) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    console.log(newProduct);
    res.redirect(`/products/${newProduct._id}`)
}));


//wrapAsync em production
app.get('/products/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('farm', 'name');
    console.log(product)
    if(!product) {
      throw new AppError('Product not found', 404);
    }
    res.render('products/show', { product });
}));

app.get('/products/:id/edit', wrapAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if(!product) {
     throw new AppError('Product not found', 404);
  }
  res.render('products/edit', { product, categories });
}))


//Here contains try and catch, this do it the same work witch wrapAsync function
app.put('/products/:id', async (req, res, next) => {
  try{
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true});
    res.redirect(`/products/${product._id}`);
  } catch(e) {
    next(e);
  }
  
})

app.delete('/products/:id', wrapAsync(async (req, res) => {
  const { id } = req.params;
  const delectedProduct = await Product.findByIdAndDelete(id);
  res.redirect('/products')
}))


app.listen(3000, () => {
  console.log('wep')
})




