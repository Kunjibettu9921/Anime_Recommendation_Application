import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api"; // Django backend URL

export const getAnimeList = async () => {
  const response = await axios.get(`${BASE_URL}/anime`);
  return response.data;
};

export const getAnimeDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/anime/${id}`);
  return response.data;
};

export const createAnime = async (animeData) => {
  const response = await axios.post(`${BASE_URL}/anime`, animeData);
  return response.data;
};

export const deleteAnime = async (id) => {
  await axios.delete(`${BASE_URL}/anime/${id}`);
};