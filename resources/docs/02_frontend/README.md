# <img src="../../images/react-icon.png" width=30> 1. Frontend Setup

## ✨ 1. REACT + VITE setup

### 1.1 Create a new REACT app using VITE server

```bash
$ npm create vite@latest # prompt instructions: write the project name as `frontend`, choose `React` as the frontend framework and choose `Javascript` as the backend framework for this app
$ cd frontend
$ npm install # to get the node_modules folder, very important
```

### 1.2 Start Development Server to test

```bash
$ npm run dev # this is for VITE
```

> [!NOTE]
> If you get an error of the version `19` on Codespaces, downgrade the react version to `18`
> Last updated: `29.12.2024`

### 1.3 Install dependencies

```bash
$ npm install axios
$ npm install bootstrap
$ npm install react-router-dom # optional
$ npm install tailwindcss postcss autoprefixer # optional
$ npm install eslint prettier --save-dev # optional
```

* Check the `package.json` to verify if the dependencies are installed as there are no `requirements.txt` file here for REACT + VITE setup

## ✨ 2. Coding

### 2.1 Create `AnimeList.jsx`

You will have to create a new folder called components and then create a new file caleld AnimeList.jsx

```javascript
// 'frontend/src/components/AnimeList.jsx'

import { useEffect, useState } from "react";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL // for CORS
});

const AnimeList = () => {
    const [animeItems, setAnimeItems] = useState([]);
    const [newAnimeItem, setNewAnimeItem] = useState({ name: "", rating: 0.00 });
    const [editAnimeItem, setEditAnimeItem] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get("/anime/");
            setAnimeItems(response.data);
        } catch (error) {
            console.error("Error in the get method", error);
        }
    };

    const handleCreate = async () => {
        try {
            const response = await axiosInstance.post("/anime/", newAnimeItem);
            setAnimeItems([...animeItems, response.data]);
            setNewAnimeItem({ name: "", rating: 0.00 });
        } catch (error) {
            console.error("Error creating Anime item", error);
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await axiosInstance.put(`/anime/${editAnimeItem.id}/`, editAnimeItem);
            setAnimeItems(animeItems.map((item) => (item.id === editAnimeItem.id ? response.data : item)));
            setEditAnimeItem(null);
        } catch (error) {
            console.error("Error updating Anime item", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/anime/${id}/`);
            setAnimeItems(animeItems.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Error deleting Anime item", error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Anime Item List</h1>

            {/* Create Anime Item Form */}
            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Create Anime Item</h5>
                            <form>
                                <div className="form-group">
                                    <label>Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={newAnimeItem.name}
                                        onChange={(e) => setNewAnimeItem({ ...newAnimeItem, name: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Rating:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={newAnimeItem.rating}
                                        onChange={(e) => setNewAnimeItem({ ...newAnimeItem, rating: parseFloat(e.target.value) })}
                                    />
                                </div>
                                <button type="button" className="btn btn-primary" onClick={handleCreate}>
                                    Create Anime Item
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Anime Item List Table */}
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Anime Item List</h5>
                    <table className="table table-bordered">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Rating</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {animeItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{typeof item.rating === 'number' ? item.rating.toFixed(2) : 'N/A'}</td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm mr-2"
                                        onClick={() => setEditAnimeItem(item)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>


            {/* Edit Anime Item Form */}
            {editAnimeItem && (
                <div className="row mt-4">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Edit Anime Item</h5>
                                <form>
                                    <div className="form-group">
                                        <label>Name:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={editAnimeItem.name}
                                            onChange={(e) => setEditAnimeItem({ ...editAnimeItem, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Rating:</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={editAnimeItem.rating}
                                            onChange={(e) => setEditAnimeItem({ ...editAnimeItem, rating: parseFloat(e.target.value) })}
                                        />
                                    </div>
                                    <button type="button" className="btn btn-success" onClick={handleUpdate}>
                                        Update Anime Item
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary ml-2"
                                        onClick={() => setEditAnimeItem(null)}
                                    >
                                        Cancel
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnimeList;

```

### 2.2 Update `App.jsx`

```javascript
// 'frontend/src/App.jsx'
// Auto generated file

import AnimeList from "./components/AnimeList.jsx";

import "bootstrap/dist/css/bootstrap.css"
function App() {
  return (
      <AnimeList/>
  );
}

export default App

```

### 2.3 Update `main.jsx`

```javascript
// 'frontend/src/main.jsx'
// Auto generated file

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

```

### 2.4 Check configurations of `vite.config.js`

```javascript
// 'frontend/vite.config.js'
// Auto generated file
// Just check, do not update if not necessary

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
```

### (Optional) Update `index.html`

```javascript
// 'frontend/index.html'
// Auto generated file

// Optional editing

```