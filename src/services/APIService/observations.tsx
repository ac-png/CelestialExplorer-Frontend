import axios from 'axios';

const API_URL = 'http://localhost/api/auth';

export const fetchObservations = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/observations`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data.observations;
    } catch (error) {
        throw error.response ? error.response.data : 'An unexpected error occurred';
    }
};