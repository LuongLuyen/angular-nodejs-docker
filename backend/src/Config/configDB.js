const mysql = require('mysql2')
require('dotenv').config()

const connection = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.USER,
    password:process.env.PASS,
    database:process.env.DATABASE,
    port:process.env.DB_PORT
})
connection.connect(err => {
    if (err) {
        console.error('[LOG] Kết nối csdl không thành công!', err)
    } else {
        console.log('[LOG] Kết nối csdl thành công!')
    }
});
module.exports = connection