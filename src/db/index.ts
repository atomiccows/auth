import { Config } from '../config/config';

const migrateMongoose = require('migrate-mongoose-typescript');

const migrationsPath = `${__dirname}/migrations/`;
const templatePath = `${__dirname}/template.ts`;
const dbConnectionUri = Config.db;
const collectionName = 'Migrations';
const autosync = true;

export const migrator = new migrateMongoose({
    migrationsPath, // Path to migrations directory
    templatePath, // The template to use when creating migrations needs up and down functions exposed
    dbConnectionUri, // mongo url
    collectionName, // collection name to use for migrations (defaults to 'migrations')
    autosync, // if making a CLI app, set this to false to prompt the user, otherwise true
});
