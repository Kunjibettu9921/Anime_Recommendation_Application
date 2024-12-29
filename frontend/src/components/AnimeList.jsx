import { useEffect, useState } from "react";
import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: "https://ubiquitous-xylophone-jjrwwpp45x66cpw65-8000.app.github.dev",
    baseURL: import.meta.env.VITE_API_BASE_URL
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