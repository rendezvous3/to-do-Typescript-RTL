import React, { useState } from 'react';
import { useOnChange } from './useOnChange.tsx';
import { useSetTodos } from './useSetTodos.tsx';

type FormElem = React.FormEvent<HTMLFormElement>;

interface ITodo {
  text: string;
  complete: boolean;
}

function App(): JSX.Element {
  const { value, setValue, handleChange } = useOnChange();
  const { todos, addTodo, completeTodo } = useSetTodos();
  // debugger;
  const handleSubmit = (e: FormElem): void => {
    e.preventDefault();
    addTodo(value);
    setValue('');
  };
  return (
    <div data-test='component-app' data-testid='component-app'>
      <h1>Todo List</h1>
      <form
        data-test='to-do-form'
        data-testid='to-do-form'
        onSubmit={handleSubmit}
      >
        <input
          type='text'
          value={value}
          onChange={handleChange}
          data-test='text-input'
          data-testid='text-input'
          placeholder='enter ToDo'
          required
        />
        <button type='submit' data-test='btn'>
          Add Todo
        </button>
      </form>
      <div data-test='to-do-list' data-testid='to-do-list'>
        {todos.map((todo: ITodo, index: number) => {
          return (
            <div key={index} data-testid='to-do-block'>
              <h4>{todo.text}</h4>
              <button type='button' data-testid='to-do-btn' onClick={() => completeTodo(index)}>
                {todo.complete ? 'Incomplete' : 'Complete'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
