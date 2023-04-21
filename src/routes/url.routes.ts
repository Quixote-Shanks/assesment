import express from 'express';

import  {createNewurl, checkDatabaseForShortenedUrl}  from '../controllers/url_controllers';



const router = express.Router();


router.post('/shorten', createNewurl);
router.get('/check', checkDatabaseForShortenedUrl);


export default router;
