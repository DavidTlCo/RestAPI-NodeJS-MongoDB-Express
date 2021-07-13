const mongoose  = require("mongoose");

const dbConnection = async() => {
    try {
        mongoose.connect( process.env.MONGODB_CNN, {
            // Objetos recomendados para Mongoose
            userNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true
        });
        console.log( 'Data base online' );
    } catch (err) {
        console.log(err);
        throw new Error( 'Error al iniciar la Base de datos' );
    }
}

module.exports = {
    dbConnection
};