import { Router } from 'express';  
import { UBS } from './Models/UBS';


export const router = Router();

router.get('/ubs', async (request, response) => 
{
    UBS.findAndCount({

    })
    .then(results => {
        response.status(200).json({
            'status': true,
            'data': {
                'xxx': 1,
                results
            }
        })
    });
});