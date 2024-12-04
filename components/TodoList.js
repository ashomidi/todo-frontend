// components/TodoList.js
import { useState } from "react";
import TodoItem from "./TodoItem";
import axios from "../utils/axios";
import { useRouter } from "next/router";

const TodoList = ({ todos }) => {
  const [selectedTodos, setSelectedTodos] = useState([]);
  const router = useRouter();

  const toggleSelect = (id) => {
    if (selectedTodos.includes(id)) {
      setSelectedTodos(selectedTodos.filter((todoId) => todoId !== id));
    } else {
      setSelectedTodos([...selectedTodos, id]);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedTodos.length === 0) return;
    try {
      await axios.delete("/todos/bulk-delete", {
        data: { ids: selectedTodos },
      });
      setSelectedTodos([]);
      router.reload();
    } catch (error) {
      console.error("Error bulk deleting todos:", error);
    }
  };

  return (
    <div>
      {Array.isArray(todos) ? todos.map((todo) => (
        <TodoItem
          key={todo.todo_id}
          todo={todo}
          toggleSelect={toggleSelect}
          selected={selectedTodos.includes(todo.todo_id)}
        />
      )) : "No item available yet!"}
      {selectedTodos.length > 0 && (
        <button onClick={handleBulkDelete} className="bulk-delete">
          Delete Selected
        </button>
      )}
      <style jsx>{`
        .bulk-delete {
          margin-top: 20px;
          padding: 10px 20px;
          background-color: red;
          color: white;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default TodoList;
