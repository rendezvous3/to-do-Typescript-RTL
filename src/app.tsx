import React, { useState } from 'react';

type FormElem = React.FormEvent<HTMLFormElement>;
type ChangeEvt = React.ChangeEvent<HTMLInputElement>;

function App(): JSX.Element {
  const [value, setValue] = React.useState<string>('');
  // debugger;
  const handleSubmit = (e: FormElem): void => {
    e.preventDefault();
    setValue('');
  };
  const handleChange = (e: ChangeEvt): void => {
    setValue(e.target.value);
  };
  return (
    <div data-test='component-app'>
      <h1>Todo List</h1>
      <form data-test='to-do-form' onSubmit={handleSubmit}>
        <input
          type='text'
          value={value}
          onChange={handleChange}
          data-test='text-input'
          required
        />
        <button type='submit' data-test='btn'>
          Add Todo
        </button>
      </form>
    </div>
  );
}

export default App;
