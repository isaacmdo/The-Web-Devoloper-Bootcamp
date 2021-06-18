const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/data-relations', 
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(e => {
  console.log('mongo conect!')
})

const userSchema = new mongoose.Schema({
  first: String,
  last: String,
  addresses: [{
    _id: { id: false },
    street: String,
    city: String,
    state: String,
    country: String
  }]
});

const User = mongoose.model('User', userSchema);

const makeUser = async () => {
  const u = new User({
    first: 'Isaac',
    last: 'Moura'
  })

  u.addresses.push({
    street: 'reinaldo',
    city: 'Barra Velha',
    state: 'SC',
    country: 'BRA'
  })

  const res = await u.save()
  console.log(res);
}

const addAddress = async(id) => {
  const user = await User.findById(id);
  user.addresses.push({
    street: '99 3rd St.',
    city: 'New York',
    state: 'NY',
    country: 'USA',
  })
  const res = await user.save();
  console.log(res);
}

makeUser();

//addAddress('234234233');
