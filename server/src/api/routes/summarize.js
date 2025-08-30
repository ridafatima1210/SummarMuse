import { Router } from 'express';
import multer from 'multer';
import { processDocument } from '../../controllers/summarizeController.js';

const summarizeRoutes = Router();
const upload = multer({ dest: 'uploads/' });

summarizeRoutes.post('/', upload.single('file'), processDocument);

export default summarizeRoutes;