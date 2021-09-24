var express = require('express');
var logger = require('morgan');

// routers
// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// inicio de api
var app = express();

// middlewares
app.use(logger('dev')); // logeo de request a modo dev con libreria morgan
app.use(express.json()); // configura un header para que leer y returar jsons
app.use(express.urlencoded({ extended: false })); // encodear la url que recibe el endpoint

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

// Mi primer router, para no abusar de la pobre app
// agrupar endpoints relacionados
var asdRouter = express.Router();

/* GET home page. */
asdRouter.get('/', function(req, res, next) {
  console.log('1er endpoint del router');
  res.json({ name: 'asd' });
});

app.use('/asd', asdRouter);
// app.use('/users', usersRouter);

module.exports = app;
