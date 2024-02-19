import express from 'express';
import cors from 'cors';
import { CONTACT_ROUTER } from './app/routes/contactRoute.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
   res.json({
      message: 'Welcome to contact book application.',
   });
});

app.use('/api/contacts', CONTACT_ROUTER);

export default app;
