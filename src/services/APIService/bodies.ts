import axios from 'axios';

const API_URL = 'https://api.le-systeme-solaire.net/rest';

export async function fetchKnownCount() {
    try {
        const response = await axios.get(`${API_URL}/knowncount`);
        return response.data.knowncount;
    } catch (error) {
        console.error('Error fetching known count:', error.message);
        throw new Error('Failed to fetch known count');
    }
}

export async function fetchBodies() {
    try {
        const response = await axios.get(`${API_URL}/bodies`);
        if (!response.data || !Array.isArray(response.data.bodies)) {
            throw new Error('Invalid response format while fetching bodies');
        }
        const sortedBodies = response.data.bodies.sort((a, b) => a.name.localeCompare(b.name));
        return sortedBodies;
    } catch (error) {
        console.error('Error fetching bodies:', error.message);
        throw new Error('Failed to fetch bodies');
    }
}

export async function fetchBodyById(id) {
    try {
        const response = await axios.get(`${API_URL}/bodies/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching body by ID:', error.message);
        if (error.response && error.response.status === 404) {
            throw new Error(`Body with ID ${id} not found`);
        } else {
            throw new Error('Failed to fetch body by ID');
        }
    }
}
