import axios from 'axios';

const API_URL = 'https://api.unsplash.com/search/photos';
const ACCESS_KEY = 'PDjAZNIwxIqXWLHa8KTKayPzK4jLlDGiT1NMcAYZbMU';

export async function photoSearch() {
    try {
        const response = await axios.get(`${API_URL}?query=moon&per_page=1&client_id=${ACCESS_KEY}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching searched photo:', error);
        throw error;
    }
}
