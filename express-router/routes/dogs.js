const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('ALL Dogs')
});

router.get('/', (req, res) => {
  res.send('create one Dogs')
});

router.get('/:id', (req, res) => {
  res.send('Viewing one Dog')
});

router.get('/:id/edit', (req, res) => {
  res.send('editing one Dog')
})


module.exports = router;