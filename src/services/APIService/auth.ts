import axios from 'axios';

const API_URL = 'http://localhost/api';

export const registerUser = async (name, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/register`, {
            name,
            email,
            password,
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : 'An unexpected error occurred';
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : 'An unexpected error occurred';
    }
};

export const getUserData = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/user`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data.user;
    } catch (error) {
        throw error.response ? error.response.data : 'An unexpected error occurred';
    }
};