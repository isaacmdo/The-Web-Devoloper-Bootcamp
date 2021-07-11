if(process.env.NODE_ENV !== "production"){
  require('dotenv').config();
}

//console.log(process.env.SECRET)

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/user');

const usersRoutes = require('./routes/user');
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('database connected')
});

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const sessionConfig = {
  secret: 'thisIsSecret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}
app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  // console.log(req)
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
})

app.use('/', usersRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes);

app.get('/fakeuser', async (req, res) => {
  const user = new User({email: 'isaac@email.com', username: 'isaac'});
  const newUser = await User.register(user, '123');
  res.send(newUser);
})

app.get('/', (req, res) =>{
  res.render('home.ejs')
})

app.all('*', (req, res, next) => {
  next(new ExpressError('Page not found', 404));
})

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if(!err.message) err.massage = 'Oh No, Something Went Wrong!'
  res.status(statusCode).render('error', { err });
});


app.listen(3000, () => {
    console.log('connect on port 3000')
})