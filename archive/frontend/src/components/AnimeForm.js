import React, { useState } from "react";
import { createAnime, updateAnime } from "../api/animeService";

const AnimeForm = ({ currentAnime, onSuccess }) => {
  const [animeData, setAnimeData] = useState(
    currentAnime || { title: "", description: "", published: false }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnimeData({ ...animeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentAnime) {
      await updateAnime(currentAnime.id, animeData);
    } else {
      await createAnime(animeData);
    }
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={animeData.title}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={animeData.description}
        onChange={handleChange}
      />
      <label>
        Published:
        <input
          type="checkbox"
          name="published"
          checked={animeData.published}
          onChange={(e) => setAnimeData({ ...animeData, published: e.target.checked })}
        />
      </label>
      <button type="submit">{currentAnime ? "Update" : "Add"} Anime</button>
    </form>
  );
};

export default AnimeForm;
