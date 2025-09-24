"use client"

import { useState, useRef } from 'react';

let id = 0;

const INITIAL_TASKS = [
  { id: id++, label: 'Walk the dog' },
  { id: id++, label: 'Water the plants' },
  { id: id++, label: 'Wash the dishes' },
];

export default function App() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const inputRef = useRef<HTMLInputElement>(null)

  const addTodoOnClick = () => {
    const newLabel = inputRef.current?.value.trim();

    const existingLabels = new Set(tasks.map(task => task.label.toLowerCase()));

    if (!newLabel || existingLabels.has(newLabel.toLowerCase())) {
      return;
    }

    setTasks(prev => {
      return [...prev, {
        id: id++,
        label: newLabel,
      }]
    });
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  const removeTodoOnclick = (id: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }

  const renderTasks = tasks.map(({ id, label }) => (
    <li key={id}>
      <span>{label}</span>
      <button onClick={() => removeTodoOnclick(id)}>Delete</button>
    </li>
  ))

  console.log(tasks)

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          aria-label="Add new task"
          type="text"
          placeholder="Add your task"
          ref={inputRef}
        />
        <div>
          <button onClick={addTodoOnClick}>Submit</button>
        </div>
      </div>
      <ul>
        {renderTasks}
      </ul>
    </div>
  );
}
