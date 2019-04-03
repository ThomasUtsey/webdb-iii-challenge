const express = require('express');
const router = express.Router();
const knex = require('knex');

const knexConfig = {
  client:'sqlite3',
  useNullAsDefault: true,
  connection:{
    filename:'./data/lambda.sqlite3'
  }
}
const db = knex(knexConfig)
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

router.get('/', async (req, res)=>{
  try{
 const result = await db('cohorts')
 res.status(200).json(result);
  }catch(error){
    const message = errors[error.errno] || 'Retry different value server error';
    res.status(500).json({message, error});
  }
});

router.get('/:id', async (req, res)=>{
  try{
 const result = await db('cohorts').where({ id: req.params.id }).first();
 if(result){
 res.status(200).json(result)
 }else{
  res.status(404).json({message: 'Records not found'})
 }
  }catch(error){
    const message = errors[error.errno] || 'Retry different value server error';
    res.status(500).json({message, error});
  }
});
router.put('/:id',async (req,res)=>{
  try{
 const result = await db('cohorts')
 .where({ id: req.params.id })
 .update(req.body);

if(result > 0) {
  const resultone = await db('cohorts')
    .where({ id: req.params.id })
    .first();
  res.status (200).json(resultone); 
}else{
  res.status(404).json({message: 'Records not found'})
}
  }catch(error){
    const message = errors[error.errno] || 'Retry different value server error';
    res.status(500).json({message, error});
  }
});
router.delete('/:id',async (req,res)=>{
  try{
 const result = await db('cohorts')
 .where({ id: req.params.id })
 .del();

if(result > 0) {
  res.status (200).end(); 
}else{
  res.status(404).json({message: 'Records not found'})
}
  }catch(error){
    const message = errors[error.errno] || 'Retry different value server error';
    res.status(500).json({message, error});
  }
});

// `[GET] /api/cohorts/:id/students` returns all students for the cohort with the specified `id`.
router.get('/:id/students', async (req, res)=>{
  try{
 const students = await db('students').where({cohortID:req.params.id })
 const result = await db('cohorts').where({ id: req.params.id });
 if(result){
 res.status(200).json(students)
 }else{
  res.status(404).json({message: 'Records not found'})
 }
  }catch(error){
    const message = errors[error.errno] || 'Retry different value server error';
    res.status(500).json({message, error});
  }
});


module.exports = router;

