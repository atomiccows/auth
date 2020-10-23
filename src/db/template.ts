require('reflect-metadata');
const {Config} = require('../../config/config');
const mongoose = require('mongoose');

async function up() {
    try {
        await mongoose.connect(Config.db, { useNewUrlParser: true });

        // tslint:disable-next-line:no-console
        console.log('Done 😃');
        mongoose.connection.close( () => {
            // tslint:disable-next-line:no-console
            console.log('Mongoose disconnected on app termination');
            process.exit(0);
        });
    } catch (error) {
        // tslint:disable-next-line:no-console
        console.log(error);
    }
}

async function down() {
    try {
        await mongoose.connect(Config.db,  { useNewUrlParser: true });

        // tslint:disable-next-line:no-console
        console.log('Done 😃');
        mongoose.connection.close(() => {
            // tslint:disable-next-line:no-console
            console.log('Mongoose disconnected on app termination');
            process.exit(0);
        });
    } catch (error) {
        // tslint:disable-next-line:no-console
        console.log(error);
    }
}

module.exports.up = up;
module.exports.down = down;
