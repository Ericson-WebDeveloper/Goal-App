const mongoose = require('mongoose');


const connectDb = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB);
        console.log(`Mongo Databse Connect ${conn.connection.host}`);
    } catch (error) {
        console.log(`Connect Database Error: ${error}`);
        process.exit(1);
    }
}

module.exports = connectDb;
