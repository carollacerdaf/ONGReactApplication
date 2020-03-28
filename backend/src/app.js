const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());
//Rota e Recursos

/**Tipo de Parâmetros
 * Query Params:Parâmetros enviados na rota após o símbolo de interrogação (Filtro, Paginação) /users?page=2
 * Route Params: Parâmetros utilizados para identificar recursos /users/:id
 * Request Body: Corpo da Requisição, para criar ou alterar recursos
 */

 /** 
  * Utilizamos o SQLite
  * Driver: SELECT * FROM USERS
  * Query Builder: table('users').select('*').where()*/

module.exports = app;