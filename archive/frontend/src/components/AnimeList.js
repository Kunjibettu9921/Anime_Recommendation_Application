import React, { useState, useEffect } from "react";
import { fetchAllAnime, searchAnimeByTitle } from "../api/animeService";

const AnimeList = () => {
  const [animeList, setAnimeList] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    loadAnime();
  }, []);

  const loadAnime = async () => {
    const response = await fetchAllAnime();
    setAnimeList(response.data);
  };

  const handleSearch = async () => {
    const response = await searchAnimeByTitle(searchTitle);
    setAnimeList(response.data);
  };

  return (
    <div>
      <h1>Anime List</h1>
      <input
        type="text"
        placeholder="Search by title"
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {animeList.map((anime) => (
          <li key={anime.id}>{anime.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default AnimeList;