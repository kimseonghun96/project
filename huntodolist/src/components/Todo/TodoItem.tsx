import React from "react";
import "./TodoItem.scss";

interface TodoItemProps {
  task: string;
  completed: boolean;
  toggleCompleted: () => void;
  deleteTask: () => void;
  date: Date | undefined; // Date 또는 undefined로 변경
}

const TodoItem: React.FC<TodoItemProps> = ({
  task,
  completed,
  toggleCompleted,
  deleteTask,
  date,
}) => {
  const adjustedDate = date
    ? new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    : undefined;
  const dateString = adjustedDate
    ? adjustedDate.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "short",
        day: "numeric",
        weekday: "short",
      })
    : "";
  return (
    <div className="todo-item">
      {task && (
        <>
          <input
            type="checkbox"
            checked={completed}
            onChange={toggleCompleted}
          />
          <span
            style={{ textDecoration: completed ? "line-through" : "none" }}
            className="task">
            {task}
          </span>
          {date && (
            <span
              className="date"
              style={{
                color: completed ? "#4caf50" : "inherit",
              }}>
              {dateString}
            </span>
          )}
          {date && (
            <button className="delete-button" onClick={deleteTask}>
              x
            </button>
          )}
        </>
      )}
      {!task && (
        <>
          <span className="date">{dateString}</span>
          {completed && (
            <button className="delete-button" onClick={deleteTask}>
              x
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default TodoItem;
