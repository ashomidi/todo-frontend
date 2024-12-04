import { useState, useEffect } from "react";
import axios from "../utils/axios";
import TodoList from "../components/TodoList";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const fetchSuggestions = async () => {
    try {
      const response = await axios.get("/suggestions");
      setSuggestions(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!description) return;
    try {
      await axios.post("/todos", { description });
      setDescription("");
      fetchTodos();
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setDescription(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="container">
      <h1>To-Do App</h1>
      <form onSubmit={handleCreate} className="create-form">
        <textarea
          placeholder="Enter description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onFocus={fetchSuggestions}
          required
        ></textarea>
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((item, index) => (
              <li key={index} onClick={() => handleSuggestionClick(item)}>
                {item}
              </li>
            ))}
          </ul>
        )}

        <button type="submit">Add To-Do</button>
      </form>
      <TodoList todos={todos} />
      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 50px auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
        }
        .create-form {
          display: flex;
          flex-direction: column;
          margin-bottom: 30px;
        }
        .create-form input,
        .create-form textarea {
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .create-form button {
          padding: 10px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .create-form button:hover {
          background-color: #005bb5;
        }
        .suggestions-list {
          list-style: none;
          padding: 0;
          margin: 0;
          background: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        .suggestions-list li {
          padding: 10px;
          cursor: pointer;
        }
        .suggestions-list li:hover {
          background: #eee;
        }
      `}</style>
    </div>
  );
};

export default Home;
