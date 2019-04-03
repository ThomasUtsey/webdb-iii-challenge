const express = require('express');
const router = express.Router();
const db = require('../data/lambda.sqlite3');

const errors = { 
  '19':'Another entree has the same value no duplicates'
}

router.post('/',async (req, res) => {
  try {
    const [id] = await db('cohorts').insert(req.body);
    const result = await db('cohorts')
    .where({id})
    .first()
    res.status(201).json(result);
  } catch (error) {
    // log error to database
    const message = errors[error.errno] || 'Retry different value server error';
    res.status(500).json({message, error});
  }
  
})




router.get('/', async (req, res) => {
  res.send(`
    <h2>cohorts API</h2>
    <p>Welcome to the Lambda Project API</p>
    `);
});
module.exports = router;