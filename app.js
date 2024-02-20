import express from 'express';
import cors from 'cors';
import ApiError from './app/apiError.js';

const app = express();
import { CONTACT_ROUTER } from './app/routes/contactRoute.js';

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
   res.json({ message: 'Welcome to contact book application.' });
});

app.use('/api/contacts', CONTACT_ROUTER);

app.use((req, res, next) => {
   return next(new ApiError(404, 'Resource not found'));
});

app.use((err, req, res, next) => {
   return res.status(err.statusCode || 500).json({
      message: err.message || 'Internal Server Error',
   });
});

export default app;
