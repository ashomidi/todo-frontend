import { useState } from "react";
import axios from "../utils/axios";
import { useRouter } from "next/router";
import { FiCheckSquare } from "react-icons/fi";
import { FiXSquare } from "react-icons/fi";
import { FiTrash } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";

const TodoItem = ({ todo, toggleSelect, selected }) => {
  const router = useRouter();
  const [isDone, setIsDone] = useState(todo.is_done);

  const handleDelete = async () => {
    try {
      await axios.delete(`/todo/${todo.todo_id}`);
      router.reload();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleToggleDone = async () => {
    try {
      await axios.put(`/todo/${todo.todo_id}`, { is_done: !isDone });
      setIsDone(!isDone);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div className={`todo-item ${isDone ? "done" : ""}`}>
      <div>
        <input
          type="checkbox"
          checked={selected}
          onChange={() => toggleSelect(todo.todo_id)}
        />
        <span className="todo_desc">{todo.description}</span>
      </div>
      <div className="actions">
        {/* <button onClick={() => router.push(`/edit/${todo.todo_id}`)}>
          Edit
        </button> */}
        {/* <button onClick={handleDelete}>Delete</button> */}
        {/* <button onClick={handleToggleDone}>
          {isDone ? "Mark as Undone" : "Mark as Done"}
        </button> */}
        <FiEdit
          className="action-icon"
          onClick={() => router.push(`/edit/${todo.todo_id}`)}
          size={23}
          style={{ cursor: "pointer" }}
        />
        <FiTrash
          className="action-icon"
          onClick={handleDelete}
          size={23}
          style={{ cursor: "pointer" }}
        />
        {isDone ? (
          <FiXSquare
            className="action-icon"
            onClick={handleToggleDone}
            size={23}
            style={{ cursor: "pointer" }}
          />
        ) : (
          <FiCheckSquare
            className="action-icon"
            onClick={handleToggleDone}
            size={23}
            style={{ cursor: "pointer" }}
          />
        )}
      </div>
      <style jsx>{`
        .todo_desc {
          margin-left: 10px;
        }
        .todo-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px;
          border-bottom: 1px solid #ccc;
        }
        .done span {
          text-decoration: line-through;
          color: gray;
        }
        .actions {
          display: flex;
          gap: 10px;
        }
      `}</style>
    </div>
  );
};

export default TodoItem;
