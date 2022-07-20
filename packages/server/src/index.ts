import 'express-async-errors';
import 'reflect-metadata';
import app from './app';
import { ___prod___ } from './utils/contants';
import { AppDataSource } from './lib/data-source';

(async () => {
  try {
    const ds = await AppDataSource.initialize();

    if (!ds.isInitialized) {
      throw new Error('DataSource is not initialized');
    }

    const port = process.env.PORT || 4242;
    app.listen(port, () => {
      console.log(`~~~~ Server Started ~~~~`);
      if (!___prod___) {
        console.log(`**** VISIT: http://localhost:${port} ****`);
      }
    });
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
})();
