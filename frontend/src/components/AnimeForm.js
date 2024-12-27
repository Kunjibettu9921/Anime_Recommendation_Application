import React, { useState, useEffect } from 'react';
import { createAnime, updateAnime } from '../api';

export const AnimeForm = ({ animeToEdit, setAnimes, setAnimeToEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (animeToEdit) {
      setTitle(animeToEdit.title);
      setDescription(animeToEdit.description);
    }
  }, [animeToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (animeToEdit) {
      const updatedAnime = { ...animeToEdit, title, description };
      await updateAnime(animeToEdit.id, updatedAnime);
    } else {
      const newAnime = { title, description };
      const createdAnime = await createAnime(newAnime);
      setAnimes((prevAnimes) => [...prevAnimes, createdAnime]);
    }

    setTitle('');
    setDescription('');
    setAnimeToEdit(null); // Reset form after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">{animeToEdit ? 'Update' : 'Create'} Anime</button>
    </form>
  );
};