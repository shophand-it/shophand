import express from 'express';
import {
  createPart,
  getAllParts,
  getPartById,
  updatePart,
  deletePart
} from '../controllers/partsController';

const router = express.Router();

router.post('/', createPart);
router.get('/', getAllParts);
router.get('/:id', getPartById);
router.put('/:id', updatePart);
router.delete('/:id', deletePart);

export default router;