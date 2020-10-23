import {migrator} from './index';

(async () => {
    await migrator.sync();
    const migrations = await migrator.list();
    await migrator.run('up', migrations[migrations.length - 1].name);
})();
