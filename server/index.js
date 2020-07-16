const next = require('next');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');

const apiRoutes = require('./routes');
const openApiDocumentation = require('./docs');
const globalErrorHandler = require('./controllers/error');
const envConfig = require('../env.config');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

mongoose
  .connect(envConfig.DATABASE_LOCAL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(envConfig);
    console.log('database successful connected');
  })
  .catch((err) => {
    console.log('mongo db no connected');
    console.log(err);
  });

app
  .prepare()
  .then(() => {
    const server = express();

    if (dev) server.use(cors());

    server.use(express.json({ limit: '10kb' }));

    server.use(cookieParser());

    server.use('/api', apiRoutes);

    server.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(openApiDocumentation),
    );

    server.use(globalErrorHandler);

    server.all('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) {
        console.log(err, 'server.listen error')
        throw err;
      }
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch(console.error);
