import express from 'express';
import  {bookControllers}  from './book.controller';

const router = express.Router();

router.post('/',bookControllers.createNewBook);
router.get('/',bookControllers.getAllBooks);
router.get('/:productId', bookControllers.getSpecificBook);
router.put('/:productId', bookControllers.updateBookById);
router.delete('/:productId', bookControllers.deleteABookById);


export const bookRouter = router; 