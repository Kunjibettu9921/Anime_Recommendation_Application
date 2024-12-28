import axios from "axios";

const API_BASE_URL = "https://ubiquitous-xylophone-jjrwwpp45x66cpw65-8000.app.github.dev/api/anime";

export const fetchAllAnime = () => axios.get(API_BASE_URL);
export const fetchPublishedAnime = () => axios.get(`${API_BASE_URL}/published`);
export const searchAnimeByTitle = (title) => axios.get(API_BASE_URL, { params: { title } });
export const fetchAnimeById = (id) => axios.get(`${API_BASE_URL}/${id}`);
export const createAnime = (data) => axios.post(API_BASE_URL, data);
export const updateAnime = (id, data) => axios.put(`${API_BASE_URL}/${id}`, data);
export const deleteAnimeById = (id) => axios.delete(`${API_BASE_URL}/${id}`);
export const deleteAllAnime = () => axios.delete(API_BASE_URL);