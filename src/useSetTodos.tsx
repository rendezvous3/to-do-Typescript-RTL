import React from 'react';

interface ITodo {
  text: string;
  complete: boolean;
}

export const useSetTodos = () => {
  const [todos, setTodos] = React.useState<ITodo[]>([]);
  const addTodo = (text: string): void => {
    const newTodos: ITodo[] = [...todos, { text: text, complete: false }];
    setTodos(newTodos);
  };
  const completeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };
  return {
    todos,
    setTodos,
    addTodo,
    completeTodo
  };
};
