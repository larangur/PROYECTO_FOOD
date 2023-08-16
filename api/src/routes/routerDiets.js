const {Router} = require("express");
const {getHandlerDiets} = require('../handlers/handlersFood.js');

const routerFood = Router();

routerFood.get('/', getHandlerDiets)


module.exports = routerFood;