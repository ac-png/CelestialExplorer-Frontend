import axios from 'axios';

const NASA_API_URL = 'https://images-api.nasa.gov';

export async function nasaImage(englishName) {
    try {
        const response = await axios.get(`${NASA_API_URL}/search?q=${englishName}&media_type=image`);
        console.log(response.data.collection.items[1]);
        return response.data.collection.items[1];
    } catch (error) {
        console.error('Error fetching nasa image:', error);
        throw error;
    }
}

const UPSPLASH_API_URL = 'https://api.unsplash.com/search/photos';
const ACCESS_KEY = 'PDjAZNIwxIqXWLHa8KTKayPzK4jLlDGiT1NMcAYZbMU';

export async function unsplashImage(englishName) {
    try {
        const response = await axios.get(`${UPSPLASH_API_URL}?query=${englishName}&per_page=1&client_id=${ACCESS_KEY}`);
        console.log(response.data.results[0]);
        return response.data.results[0];
    } catch (error) {
        console.error('Error fetching unsplash photo:', error);
        throw error;
    }
}