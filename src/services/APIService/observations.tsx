import axios from 'axios';

const API_URL = 'http://localhost/api/auth';

export const fetchObservations = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/observations`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        throw error.response ? error.response.data : 'An unexpected error occurred';
    }
};

export const fetchObservationByUUID = async (token, uuid) => {
    try {
        const response = await axios.get(`${API_URL}/observations/${uuid}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        throw error.response ? error.response.data : 'An unexpected error occurred';
    }
};