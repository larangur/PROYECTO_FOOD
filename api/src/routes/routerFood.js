const {Router} = require("express");
const {getHandlerFood, getHandlerFoodId , postHandlerFood} = require('../handlers/handlersFood.js');

const routerFood = Router();

routerFood.get('/', getHandlerFood)

routerFood.get('/:idFood', getHandlerFoodId)

routerFood.post('/',postHandlerFood)

module.exports = routerFood;