import React, { useState } from "react";
import "./Box.scss";
import TodoList from "../Todo/TodoList";
import MyCalendar from "../Calendar/MyCalendar";
import Weather from "../Weather/Weather";

const Box: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [todos, setTodos] = useState<import("../Todo/TodoList").Todo[]>([]);

  return (
    <div className="box">
      <div className="todo-list">
        <TodoList
          selectedDate={selectedDate}
          todos={todos}
          setTodos={setTodos}
        />
      </div>
      <div className="calendar">
        <MyCalendar
          onDateSelect={(date: Date) => setSelectedDate(date)}
          todos={todos.map((todo) => ({
            date: todo.date,
            completed: todo.completed,
          }))}
        />
      </div>
      <div className="weather">
        <Weather city="Seoul" />
      </div>
    </div>
  );
};

export default Box;
