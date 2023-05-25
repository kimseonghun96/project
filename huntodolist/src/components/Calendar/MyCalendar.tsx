import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MyCalendar.scss";

interface MyCalendarProps {
  onDateSelect: (date: Date) => void;
  todos: { date: string; completed: boolean }[];
}

const MyCalendar: React.FC<MyCalendarProps> = ({ onDateSelect, todos }) => {
  const [value, setValue] = useState(new Date());

  const handleOnChange = (value: any): void => {
    if (Array.isArray(value)) {
      setValue(value[0]);
      onDateSelect(value[0]);
    } else {
      setValue(value as Date);
      onDateSelect(value as Date);
    }
  };

  const tileClassName = ({ date }: { date: Date }) => {
    const dateString = date.toISOString().slice(0, 10);
    const todoForDate = todos.find((todo) => todo.date === dateString);

    if (todoForDate) {
      return todoForDate.completed ? "has-todo-completed" : "has-todo";
    }

    return "";
  };

  return (
    <div className="myCalendar">
      <Calendar
        className="react-calendar"
        value={value}
        onChange={handleOnChange}
        tileClassName={tileClassName}
      />
    </div>
  );
};

export default MyCalendar;
