import React, { useEffect, useState } from "react";
import { getAnimeList } from "../services/api";

const AnimeList = () => {
  const [anime, setAnime] = useState([]);

  useEffect(() => {
    fetchAnime();
  }, []);

  const fetchAnime = async () => {
    const data = await getAnimeList();
    setAnime(data);
  };

  return (
    <div>
      <h1>Anime List</h1>
      <ul>
        {anime.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default AnimeList;