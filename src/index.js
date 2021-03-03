const express = require('express');
const logger = require('morgan');
const compression = require('compression');
const swaggerUI = require('swagger-ui-express');
// const YAML = require('yamljs');

const DBClient = require('./db');
const bookRoutes = require('./routes/book');
const swaggerDocs = require('../swagger.json');

// const swaggerDocs = YAML.load('./swagger.yaml');

DBClient.connect();

const app = express();
const port = 3001;
const apiVersion = process.env.API_VERSION || 'v1';

app.use(logger('dev'));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

// compress
app.use(compression());

app.get('/', (req, res) => {
  res.json('hello world');
});

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(`/api/${apiVersion}/books`, bookRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
