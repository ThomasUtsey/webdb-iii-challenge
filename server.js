const express = require('express'); // importing a CommonJS module

const students = require('./routes/studentsroute')
const cohorts = require('./routes/cohortsroute');

const helmet = require('helmet');

const morgan = require('morgan');

const server = express();


function logger(req,res,next){
  console.log(new Date(), req.method,req.url);
  next ();
}


server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(logger);

server.use('/api/students', students);
server.use('/api/cohorts', cohorts);


server.get('/', async (req, res) => {
  res.send(`
    <h2>Lambda Project API</h2>
    <p>Welcome to the Lambda Project API</p>
    `);
});

module.exports = server;
