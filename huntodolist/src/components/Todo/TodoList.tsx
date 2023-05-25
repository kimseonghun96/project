import React, { useState } from "react";
import TodoItem from "./TodoItem";
import Modal from "../Modal/Modal";
import "./TodoList.scss";

// Todo interface 정의. todo는 할 일(task), 완료 여부(completed), 날짜(date) 세 가지 속성을 가집니다.
export interface Todo {
  task: string;
  completed: boolean;
  date: string;
}

// TodoListProps interface 정의. TodoList 컴포넌트는 선택된 날짜(selectedDate), todos 배열, todos 상태를 변경하는 함수(setTodos) 세 가지 prop을 받습니다.
interface TodoListProps {
  selectedDate: Date | null;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

// TodoList 컴포넌트 정의
const TodoList: React.FC<TodoListProps> = ({
  selectedDate,
  todos,
  setTodos,
}) => {
  // inputValue와 isModalOpen 두 가지 state를 선언합니다.
  // const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 할 일을 추가하는 함수입니다. task와 date를 받아서, 입력이 유효할 경우 새로운 todo를 todos 배열에 추가합니다.
  const addTask = (task: string, date: Date | null) => {
    if (!date || task.trim() === "") {
      return;
    }
    setTodos([
      ...todos,
      {
        task: task.trim(),
        completed: false,
        date: date.toISOString().slice(0, 10),
      },
    ]);
    setIsModalOpen(false);
  };

  // todo의 완료 여부를 변경하는 함수입니다. 인덱스를 받아서 해당하는 todo의 completed 상태를 반전시킵니다.
  const toggleCompleted = (index: number) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 할 일을 삭제하는 함수입니다. 인덱스를 받아서 해당하는 todo를 todos 배열에서 제거합니다.
  const deleteTask = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  // 선택된 날짜에 해당하는 todo들을 필터링합니다. 선택된 날짜가 없을 경우 todos 전체를 사용합니다.
  const filteredTodos = selectedDate
    ? todos.filter(
        (todo) => todo.date === selectedDate.toISOString().slice(0, 10)
      )
    : todos;

  // 필터링한 todos와 나머지 todos를 합쳐서 날짜 순으로 정렬합니다.
  const sortedTodos = filteredTodos
    .concat(todos.filter((todo) => filteredTodos.indexOf(todo) === -1))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // 주어진 날짜를 사용자의 시간대에 맞게 조정하는 함수입니다.
  const createDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const adjustedDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    return adjustedDate;
  };

  return (
    <div className="TodoListBox">
      <div className="header">
        <h1>Todo-List</h1>
        <button onClick={() => setIsModalOpen(true)}>+</button>
      </div>
      <div>
        {sortedTodos.map((todo, index) => (
          <TodoItem
            key={index}
            task={todo.task}
            completed={todo.completed}
            toggleCompleted={() => toggleCompleted(index)}
            deleteTask={() => deleteTask(index)}
            date={todo.date === "" ? undefined : createDate(todo.date)}
          />
        ))}
      </div>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(task: string, date: Date) => addTask(task, date)}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default TodoList;
