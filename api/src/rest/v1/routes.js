import { Router } from 'express';  
import { syncCSVAction, insertUBSAction, listUBSesAction, getUBSByIdAction, processCSVs } from './Controllers/UBSController';


export const router = Router();

router.post('/ubs/sync', syncCSVAction);

router.get('/ubs/sync/process', processCSVs);

router.post('/ubs/sync/process', processCSVs);

router.post('/ubs', insertUBSAction);

router.get('/ubs', listUBSesAction);

router.get('/ubs/:id', getUBSByIdAction);