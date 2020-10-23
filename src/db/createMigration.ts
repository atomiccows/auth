const {migrator} = require('./index');

const migrationName = process.argv[process.argv.length - 1];

(async () => {
    try {
        await migrator.create(migrationName);
        // tslint:disable-next-line:no-console
        console.log('Done 😃');
        process.exit(0);

    } catch (error) {
        // tslint:disable-next-line:no-console
        console.log('Something went wrong 🤬');
        // tslint:disable-next-line:no-console
        console.error(error);
        process.exit(1);

    }
})();
