import axiosInstance from '../../../util/axiosConfig';
import { setCategories } from './CategorySlices';

export const getAllCategories = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get('/categories');
        dispatch(setCategories(response.data));
    } catch (error) {
        console.error(error);
    }
};

export const createCategory = (data) => async (dispatch) => {
    try {
        const response = await axiosInstance.post('/categories', data);
        dispatch(setCategories(response.data));
    } catch (error) {
        console.error(error);
    }
};

export const editCategory = (id, data) => async (dispatch) => {
    try {
        await axiosInstance.put(`/categories/${id}`, data);
        dispatch(getAllCategories());
    } catch (error) {
        console.error(error);
    }
};

export const deleteCategory = (id) => async (dispatch) => {
    try {
        await axiosInstance.delete(`/categories/${id}`);
        dispatch(getAllCategories());
    } catch (error) {
        console.error(error);
    }
};
