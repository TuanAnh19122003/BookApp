import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../util/axiosConfig';

export const getAll = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get('/books');
        dispatch(setBooks(response.data));
    } catch (error) {
        console.error(error);
    }
};

// Khởi tạo slice
const bookSlice = createSlice({
    name: 'book',
    initialState: {
        books: [],
        loading: false,
        error: null,
    },
    reducers: {
        setBooks: (state, action) => {
            state.books = action.payload;
        },
    },
});

export const { setBooks } = bookSlice.actions;

export default bookSlice.reducer;
