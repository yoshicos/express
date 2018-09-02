// postgreSQL設定
var options = {
    // initialization options;
};
 
var pgp = require("pg-promise")(options);
 
var connection = {
    host: 'localhost',
    port: 5432,
    database: 'raspdb',
    user: 'pi',
    password: 'raspberry'
};
 
var db = pgp(connection);
 
module.exports = db;
