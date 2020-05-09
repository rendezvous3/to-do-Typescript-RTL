import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from '../app.tsx';

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper (enzyme class) for the app component
 * @function setup
 * @param {object} props
 * @param {null} state
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
  return shallow(<App {...props} />);
};

/**
 * @function findByTestAttr
 * @param {ShallowWrapper} wrapper
 * @param {string} value
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, value) => {
  return wrapper.find(`[data-test='${value}']`);
};

describe('app render', () => {
  test('renders without an error', () => {
    const wrapper = setup();
    // console.log(wrapper.debug());
    expect(wrapper.length).toBe(1);
  });
  test('renders Todo form', () => {
    const wrapper = setup();
    const toDoForm = findByTestAttr(wrapper, 'to-do-form');
    expect(toDoForm.length).toBe(1);
  });
  test('renders text input', () => {
    const wrapper = setup();
    const textInput = findByTestAttr(wrapper, 'text-input');
    expect(textInput.length).toBe(1);
  });
  test('renders submit button', () => {
    const wrapper = setup();
    const btn = findByTestAttr(wrapper, 'btn');
    expect(btn.length).toBe(1);
  });
});

describe('Testing useState hook, change evt, submit evt', () => {
  test('state updates with value of input on change', () => {
    // step 1 -> create mock fn, sub React.useState with mock=>[initState, mock fn]
    const mockSetValue = jest.fn();
    React.useState = jest.fn(() => ['', mockSetValue]);

    // step 2 -> find input box
    const wrapper = setup();
    const inputBox = findByTestAttr(wrapper, 'text-input');

    // step 3 -> simulate change event
    const mockEvent = { target: { value: 'wash dishes' } };
    inputBox.simulate('change', mockEvent);

    // step 4 -> expect mock fn toHaveBeenCalledWith with mockEvent.target.value
    expect(mockSetValue).toHaveBeenCalledWith('wash dishes');
  });
});
