import app from './app.js';
import { config } from './app/config/index.js';
import MongoDB from './app/utils/mongoDB.js';

const startServer = async () => {
   try {
      await MongoDB.connect(config.db.uri);
      console.log('Connect to the database successfully.');

      const PORT = config.app.port;
      app.listen(PORT, () => {
         console.log(`Server is running on http://localhost:${PORT}`);
      });
   } catch (error) {
      console.log('Cannot connect to the database', error);
      process.exit();
   }
};

startServer();
