import { IBook } from "./book.interface";
import { BookModel } from "./book.model"


// Create a Book
const createBookInDb = async (bookData: IBook) => {
    const result = await BookModel.create(bookData);
    return result;
}

// Get All Books 
const getBooksFromDb = async (searchTerm?: string) => {

    const filter : any = {};
    if (searchTerm) {
        const searchRegex = new RegExp(searchTerm, "i")
        filter.$or = [
            { title: searchRegex },
            { author: searchRegex },
            { category: searchRegex },
        ]
    }
    const result = await BookModel.find(filter as IBook);
    return result;
}

// get Specific book
const getSpecificBookFromDb = async (productId: string) => {
    const result = await BookModel.findById({ _id: productId });
    return result;
}

// Update a Book
const updateBookInDb = async (productId: string, updateData: IBook) => {
    const result = await BookModel.findByIdAndUpdate(productId, updateData, { new: true });
    return result;
}

// delete a book as update isDelete fild 
// const deleteBookInDb = async (productId: string) => {
//     const result = await BookModel.findByIdAndUpdate({_id:productId}, { isDeleted: true } , { new: true })
//     return result;
// }

// delete a book
const deleteBookFromDb = async (productId: string) => {
    const resutl = await BookModel.findByIdAndDelete({ _id: productId }, { lean: true });
    return resutl;
}



export const bookServices = {
    getBooksFromDb,
    createBookInDb,
    getSpecificBookFromDb,
    updateBookInDb,
    // deleteBookInDb,
    deleteBookFromDb,
}