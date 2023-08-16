const { Router } = require('express');
// const morgan = require('morgan');
// const {sequelize} = require('sequelize');

const RouterFood= require('./routerFood.js')
const RouterDiets= require('./routerDiets.js')

const router = Router();

router.use('/food', RouterFood);
router.use('/diets', RouterDiets);





module.exports = router;