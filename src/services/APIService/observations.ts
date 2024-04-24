import axios from 'axios';

const API_URL = 'http://localhost/api';

export const fetchObservations = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/dashboard/observations/user`, {
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
        const response = await axios.get(`${API_URL}/dashboard/observations/${uuid}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        throw error.response ? error.response.data : 'An unexpected error occurred';
    }
};

export const fetchObservationByBody = async (token, celestial_body_id) => {
    try {
        const response = await axios.get(`${API_URL}/dashboard/observations/body/${celestial_body_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        throw error.response ? error.response.data : 'An unexpected error occurred';
    }
};

export const CreateObservation = async (token, sky_conditions, celestial_body_id, rating, description, date, time, latitude, longitude) => {
    try {
        const response = await axios.post(`${API_URL}/dashboard/observations`, {
            sky_conditions,
            celestial_body_id,
            rating,
            description,
            date,
            time,
            latitude,
            longitude
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : 'An unexpected error occurred';
    }
};

export const deleteByUUID = async (token, uuid) => {
    try {
        const response = await axios.delete(`${API_URL}/dashboard/observations/${uuid}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        throw error.response ? error.response.data : 'An unexpected error occurred';
    }
};

export const updateByUUID = async (token, uuid, newData) => {
    try {
        const response = await axios.put(`${API_URL}/dashboard/observations/${uuid}`, newData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        throw error.response ? error.response.data : 'An unexpected error occurred';
    }
};
