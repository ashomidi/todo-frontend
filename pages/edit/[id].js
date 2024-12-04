import { useState, useEffect } from "react";
import axios from "../../utils/axios";
import { useRouter } from "next/router";

const EditTodo = () => {
  const router = useRouter();
  const { id } = router.query;
  const [description, setDescription] = useState("");

  const fetchTodo = async () => {
    if (!id) return;
    try {
      const response = await axios.get(`/todo/${id}`);      
      setDescription(response.data.description);
    } catch (error) {
      console.error("Error fetching todo:", error);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/todo/${id}`, { description });
      router.push("/");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div className="container">
      <h1>Edit To-Do</h1>
      <form onSubmit={handleUpdate} className="edit-form">
        <textarea
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <button type="submit">Update To-Do</button>
      </form>
      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 50px auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
        }
        .edit-form {
          display: flex;
          flex-direction: column;
        }
        .edit-form input,
        .edit-form textarea {
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .edit-form button {
          padding: 10px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .edit-form button:hover {
          background-color: #005bb5;
        }
      `}</style>
    </div>
  );
};

export default EditTodo;
