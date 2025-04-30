import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        loading: false,
        error: null
    },
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        addCategory:(state, action)=>{
            state.categories.push(action.payload);
        },
        editCategory: (state, action) => {
            const index = state.categories.findIndex(cat => cat.id === action.payload.id);
            if (index !== -1) {
                state.categories[index] = action.payload;
            }
        },
        deleteCategory: (state, action) => {
            state.categories = state.categories.filter(cat => cat.id !== action.payload);
        },
    },
});

export const { setCategories, setLoading, addCategory, editCategory, deleteCategory } = categorySlice.actions;
export default categorySlice.reducer;
