import React from 'react';

const AnimeList = ({ animeList }) => {
  return (
    <div>
      <h2>Anime List</h2>
      <ul>
        {animeList.map((anime) => (
          <li key={anime.id}>{anime.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AnimeList; // This is the default export