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
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '60db5c75bb11711695ab019c',
      location: `${cities[rand].city}, ${cities[rand].state}`,
      title: `${randNumberArray(descriptors)} ${randNumberArray(places)}`,
      geometry: {
        type: "Point",
        coordinates: [
          cities[rand].longitude,
          cities[rand].latitude
        ]
      },
      images: [
          {
            url: 'https://res.cloudinary.com/dhj5vavfa/image/upload/v1625600598/YelpCamp/cefnfnypbs4isrmgskpc.jpg',
            filename: 'YelpCamp/mof4ospresm6jwhzfrgp'
          },
          {
            url: 'https://res.cloudinary.com/dhj5vavfa/image/upload/v1625789765/YelpCamp/ssd240gb_ypmpqh.jpg',
            filename: 'YelpCamp/v4gbxlnceiguitsmvwfg'
          }
        ],
      description: '  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis sunt ab temporibus nesciunt maiores numquam beatae molestiae sed neque amet! Vero sequi veritatis corporis, obcaecati ratione quisquam impedit iste pariatur.',
      price: price
    });
    await camp.save();
  }
}

seedDb().then(() => {
  mongoose.connection.close();
})