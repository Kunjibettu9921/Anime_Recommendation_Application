import React, { useState, useEffect } from 'react';
import AnimeList from './components/AnimeList'; // Corrected import

function App() {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    // Example: Fetch anime list from your backend or hardcode it for now
    const fetchAnimeList = async () => {
      const response = await fetch('http://localhost:8000/api/animes'); // Example URL
      const data = await response.json();
      setAnimeList(data);
    };

    fetchAnimeList();
  }, []);

  return (
    <div>
      <h1>Anime Recommendations</h1>
      <AnimeList animeList={animeList} /> {/* Correctly passing animeList as a prop */}
    </div>
  );
}

export default App;