// __tests__/fetch.test.js
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { within } from '@testing-library/dom';
// import '@testing-library/jest-dom/extend-expect';
// import axiosMock from 'axios';
import App from '../app';

// jest.mock('axios')

// describe('Todo App', () => {
//   test('', () => {});
// });

// describe('Form Submit', () => {
//   test('displays new added todos', async () => {
//     const { getByTestId, getAllByTestId, debug } = render(<App />);
//     const textInput = getByTestId('text-input');
//     fireEvent.change(textInput, { target: { value: 'new Value' } });

//     const form = getByTestId('to-do-form');
//     fireEvent.submit(form, { preventDefault() {} });

//     fireEvent.change(textInput, { target: { value: 'another Value' } });
//     fireEvent.submit(form, { preventDefault() {} });

//     // debug();

//     const todos = getAllByTestId('to-do-block');
//     const todoList = getByTestId('to-do-list');
//     const { getByText } = within(todoList);
//     expect(todos.length).toBe(2);
//     expect(getByText('new Value')).toBeTruthy();
//     expect(getByText('another Value')).toBeTruthy();

//     // fireEvent.click(screen.getByText('Load Greeting'));

//     // await waitFor(() => screen.getByRole('heading'));
//   });
//   test('marks to do as complete when clicked', () => {

//   })
// })

describe('Form Submit', () => {
  let app;
  let textInput;
  let form;
  beforeEach(() => {
    app = render(<App />);
    textInput = app.getByTestId('text-input');
    form = app.getByTestId('to-do-form');
    fireEvent.change(textInput, { target: { value: 'new Value' } });
    fireEvent.submit(form, { preventDefault() {} });
    fireEvent.change(textInput, { target: { value: 'another Value' } });
    fireEvent.submit(form, { preventDefault() {} });
  });
  test('displays new added todos', async () => {
    const { debug, getAllByTestId, getByTestId } = app;
    // debug();
    const todos = getAllByTestId('to-do-block');
    const todoList = getByTestId('to-do-list');
    const { getByText } = within(todoList);
    expect(todos.length).toBe(2);
    expect(getByText('new Value')).toBeTruthy();
    expect(getByText('another Value')).toBeTruthy();
  });
  test('marks to do as complete when clicked', () => {
    let getByText;
    const { debug, getAllByTestId, getByTestId } = app;
    const todos = getAllByTestId('to-do-block');
    const firstBtn = getAllByTestId('to-do-btn')[0];
    const secondBtn = getAllByTestId('to-do-btn')[1];
    fireEvent.click(firstBtn);
    getByText = within(firstBtn).getByText;
    expect(getByText('Incomplete')).toBeTruthy();
    getByText = within(secondBtn).getByText;
    expect(getByText('Complete')).toBeTruthy();
    fireEvent.click(secondBtn);
    expect(getByText('Incomplete')).toBeTruthy();
  });
  test('removes todo', () => {
    // get doesnt work for chechking non existance
    // https://stackoverflow.com/questions/52783144/how-do-you-test-for-the-non-existence-of-an-element-using-jest-and-react-testing
    const { debug, getAllByTestId, queryByTestId } = app;
    const firstRemoveBtn = getAllByTestId('remove-to-do')[0];
    // if we remove first btn, second btn becomes first
    //const secondRemoveBtn = getAllByTestId('remove-to-do')[1];
    fireEvent.click(firstRemoveBtn);
    let todos = getAllByTestId('to-do-block');
    expect(todos.length).toBe(1);
    fireEvent.click(firstRemoveBtn);
    // debug();
    expect(queryByTestId('to-do-block')).toBeNull();
  });
});
