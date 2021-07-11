const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('ALL Shelters')
});

router.get('/', (req, res) => {
  res.send('create one Shelters')
});

router.get('/:id', (req, res) => {
  res.send('Viewing one Shelter')
});

router.get('/:id/edit', (req, res) => {
  res.send('editing one shelter')
})

module.exports = router;