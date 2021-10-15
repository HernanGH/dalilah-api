const express = require('express');
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
require('dotenv').config();

// routers
// var indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const productRouter = require('./routes/products');
const orderRouter = require('./routes/orders');
const validAuthentication = require('./middlewares/validAuthentication');

// inicio de api
var app = express();

// middlewares
app.use(logger('dev')); // logeo de request a modo dev con libreria morgan
app.use(express.json()); // configura un header para que leer y returar jsons
app.use(express.urlencoded({ extended: false })); // encodear la url que recibe el endpoint

// documentation
const swaggerDocument = YAML.load('./spec.yml');
// const swaggerDocumentPets = YAML.load('./pet-docs.yml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 1er endpoint de mi api
const PATH = '/';
const ENDPOINT = (request, response, next) => {
  // console.log(Object.keys(request));
  // console.log(Object.keys(response));
  console.log('SOY EL 1ER ENDPOINT, FUNCION CALLBACK')
  const tienePermisos = false;

  if (tienePermisos) {
    next();
  } else {
    response.send('<h1>ERROR no tenes permisos</h1>')
  }
  // response.send('<h1>hello, world!</h1>')
};

const segundoEndpoint = (request, response, next) => {
  console.log('SOY EL 2DO ENDPOINT, FUNCION CALLBACK')
  response.send('<h1>hello, world! desde el 2do endpoint</h1>')
}
// ENDPOINT('asd', 1, 'test');

const myLogger = (req, res, next) => {
  console.log(`${req.method}: ${req.url}`);
  next();
};

app.use(myLogger);

app.get(PATH, ENDPOINT, segundoEndpoint);

// router publicos
app.use('/auth', authRouter);

// middleware de autenticacion
app.use(validAuthentication);

// router privados, con autenticacion
app.use('/products', productRouter);
app.use('/orders', orderRouter);




module.exports = app;
