const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('database connected')
});

const randNumberArray = array => array[Math.floor(Math.random() * array.length)];

const seedDb = async () =>{
  await Campground.deleteMany({});
  for(i = 0; i < 50; i++){
    const rand = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      location: `${cities[rand].city}, ${cities[rand].state}`,
      title: `${randNumberArray(descriptors)} ${randNumberArray(places)}`
    });
    await camp.save();
  }
}

seedDb().then(() => {
  mongoose.connection.close();
})