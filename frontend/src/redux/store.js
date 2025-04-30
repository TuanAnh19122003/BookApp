import { configureStore } from '@reduxjs/toolkit';
import bookReducer from '../redux/slices/bookSlices'

export const store = configureStore({
    reducer: {
        book: bookReducer,
    },
});
