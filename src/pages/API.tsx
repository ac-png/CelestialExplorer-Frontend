import axios from 'axios';

const CELESTIAL_BODIES_URL = 'https://api.le-systeme-solaire.net/rest';

export async function fetchKnownCount() {
    try {
        const response = await axios.get(`${CELESTIAL_BODIES_URL}/knowncount`);
        return response.data.knowncount;
    } catch (error) {
        console.error('Error fetching known count:', error);
        throw error;
    }
}

export async function fetchBodies() {
    try {
        const response = await axios.get(`${CELESTIAL_BODIES_URL}/bodies`);
        const sortedBodies = response.data.bodies.sort((a: any, b: any) => a.name.localeCompare(b.name));
        return sortedBodies;
    } catch (error) {
        console.error('Error fetching bodies:', error);
        throw error;
    }
}

export async function fetchBodyById(id: string) {
    try {
        const response = await axios.get(`${CELESTIAL_BODIES_URL}/bodies/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching body by ID:', error);
        throw error;
    }
}
