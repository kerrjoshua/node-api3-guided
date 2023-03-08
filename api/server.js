const express = require('express'); // importing a CommonJS module
const hubsRouter = require('./hubs/hubs-router.js');
const morgan = require('morgan')

const server = express();

function customMorgan(req, res, next) {
  console.log(`You made a ${req.method} request.`)
  next()
}

function shortCircuit(req, res, next) {
  res.json('The request was short circuited!')
}

function addFriend(req, res, next) {
  req.friend =  'Gordon Gano'
  next();
}

server.use(express.json());
server.use('/api/hubs', hubsRouter);
server.use(morgan('dev'));
server.use(customMorgan);
// server.use(shortCircuit);
server.use(addFriend);

server.get('/', (req, res) => {
  res.send(`
    <h2>Hubs API ${req.friend}</h2>
    <p>Welcome to the Hubs API</p>
  `);
});

server.use('*', (req, res) => {
  // catch all 404 errors middleware
  res.status(404).json({ message: `${req.method} ${req.baseUrl} not found!` });
});

module.exports = server;
