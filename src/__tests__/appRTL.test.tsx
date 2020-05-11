import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { getByTestId, queryByTestId, waitForDomChange } from '@testing-library/dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import App from '../app';

describe('App render', () => {
  test('renders correctly', () => {
    const { queryByTestId, queryByPlaceholderText } = render(<App />);
    expect(queryByTestId('component-app')).toBeTruthy();
    expect(queryByPlaceholderText('enter ToDo')).toBeTruthy();
  });
});

describe('Input Value', () => {
  test('updates on change', () => {
    const { queryByTestId, queryByPlaceholderText } = render(<App />);
    const textInput = queryByTestId('text-input');
    fireEvent.change(textInput, { target: { value: 'test' } });
    expect(textInput.value).toBe('test');
  });
});

// describe('testing handleSubmit',() => {
//   test('submit evt',async () => {
//     const { queryByTestId } = render(<App />);
//     const textInput = queryByTestId('text-input');
//     fireEvent.change(textInput, { target: { value: 'test' } });

//     // await waitForDomChange();

//     // expect(textInput.value).toBe('test');

//     const form = queryByTestId('text-input');
//     fireEvent.submit(form, { preventDefault() {} });

//     await waitForDomChange();

//     const toDo = queryByTestId('to-do-block');
//     expect(toDo).toBeTruthy();
//   });
// });
