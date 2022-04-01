module.exports = {
    PORT: process.env.PORT || 3001,
    DB: process.env.DB || 'mongodb://root:toor@localhost:27018/productos_db?authSource=admin'
}