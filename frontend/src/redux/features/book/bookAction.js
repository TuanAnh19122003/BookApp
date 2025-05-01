import axios from 'axios';
import axiosInstance from '../../../util/axiosConfig';
import { setBooks, setBookDetail } from './bookSlices';

export const getAllBooks = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get('/books');
        dispatch(setBooks(response.data));
    } catch (error) {
        console.error(error);
    }
};

export const createBook = (data) => async (dispatch) => {
    try {
        const response = await axiosInstance.post('/books', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        dispatch(setBooks(response.data));
    } catch (error) {
        console.error(error);
    }
};

// Action (bookAction.js)
export const editBook = (id, formData) => async (dispatch) => {
    try {
        const response = await axios.put(`http://10.0.2.2:5000/api/books/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        dispatch(setBooks(response.data));
    } catch (error) {
        console.error('Lỗi khi cập nhật sách:', error);
    }
};


export const deleteBook = (id) => async (dispatch) => {
    try {
        await axiosInstance.delete(`/books/${id}`);
        dispatch(getAllBooks());
    } catch (error) {
        console.error(error);
    }
};

export const getBookById = (id) => async (dispatch) => {
    try {
        const response = await axiosInstance.get(`/books/${id}`);
        dispatch(setBookDetail(response.data));
    } catch (error) {
        console.error('Lỗi khi lấy chi tiết sách:', error);
    }
};

