import { createSlice } from '@reduxjs/toolkit';

const bookSlice = createSlice({
    name: 'book',
    initialState: {
        books: [],
        book: null,
        loading: false,
        error: null
    },
    reducers: {
        setBooks: (state, action) => {
            state.books = action.payload;
        },
        setBookDetail: (state, action) => {
            state.book = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        addBook:(state, action)=>{
            state.books.push(action.payload);
        },
        editBook: (state, action) => {
            const index = state.books.findIndex(book => book.id === action.payload.id);
            if (index !== -1) {
                state.books[index] = action.payload;
            }
        },
        deleteBook: (state, action) => {
            state.books = state.books.filter(book => book.id !== action.payload);
        },
    },
});

export const { setBooks, setLoading, setBookDetail } = bookSlice.actions;
export default bookSlice.reducer;
