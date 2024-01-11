const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const { info, error } = require('./utils/logger');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/user');
const loginRouter = require('./controllers/login');

const app = express();

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    info('connected to MongoDB');
  })
  .catch((er) => {
    error('error connecting to MongoDB:', er.message);
  });

app.use(cors());
app.use(express.json());

app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);

if (process.env.NODE_ENV === 'test') {
  // eslint-disable-next-line global-require
  const testRouter = require('./controllers/testing');
  app.use('/api/testing', testRouter);
}

app.use(
  '/api/blogs',
  middleware.tokenExtractor,
  middleware.userExtractor,
  blogsRouter
);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
