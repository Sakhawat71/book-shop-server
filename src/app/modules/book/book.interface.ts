export interface IBook {
    title: string;
    author: string;
    price: number;
    category: 'Fiction' | 'Science' | 'SelfDevelopment' | 'Poetry' | 'Religious';
    description: string;
    quantity: number;
    inStock: boolean;
    // isDeleted?: boolean;
    createdAt?: string;
    updatedAt?: string; 
}