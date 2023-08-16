//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

/** FORCE : false  ==> al sincronizar .. no ejecuta ningun cambio sobre los  modelos(tablas) de la BD
 *  FORCE : true   ==> al sincronizar .. elimina la tabla de la BD y vuelve y la crea 
 *  alter : true  ==> valida que cambios hay entre los modelos de sequelize y los de la BD y actualiza.. y no borra los datos
 */

// Syncing all the models at once.
conn.sync({  alter : true}).then(() => {
  //dietsSaveDB();
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
