import express from 'express';
import { json } from 'body-parser';
import { router as v1Router } from './rest/v1/routes';


export const app = express();

app.use(json({ 'limit': '10mb' }));

app.get('/', (request, response) => response.send('Welcome to Bionexo API'));
app.use('/v1', v1Router);