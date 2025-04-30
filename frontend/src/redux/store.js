import { configureStore } from '@reduxjs/toolkit';
import bookReducer from '../redux/features/book/bookSlices'
import categoryReducer from '../redux/features/category/CategorySlices'

export const store = configureStore({
    reducer: {
        books: bookReducer,
        categories: categoryReducer,
    },
})