import axios from 'axios';

// Set the base URL to connect to your Django API
const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000/api/animes/';  // Update this URL to match your Django API endpoint

// GET: Fetch all animes
export const fetchAnimes = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("There was an error fetching animes!", error);
    }
};

// POST: Create a new anime
export const createAnime = async (animeData) => {
    try {
        const response = await axios.post(API_URL, animeData);
        return response.data;
    } catch (error) {
        console.error("There was an error creating the anime!", error);
    }
};

// PUT: Update an anime
export const updateAnime = async (id, animeData) => {
    try {
        const response = await axios.put(`${API_URL}${id}/`, animeData);
        return response.data;
    } catch (error) {
        console.error("There was an error updating the anime!", error);
    }
};

// DELETE: Delete an anime
export const deleteAnime = async (id) => {
    try {
        await axios.delete(`${API_URL}${id}/`);
    } catch (error) {
        console.error("There was an error deleting the anime!", error);
    }
};
