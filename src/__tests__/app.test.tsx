import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
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
  return mount(<App {...props} />);
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

describe.skip('app render', () => {
  let wrapper;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setState]);
  beforeEach(() => {
    wrapper = Enzyme.shallow(<App />);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('renders without an error', () => {
    // console.log(wrapper.debug());
    expect(wrapper.length).toBe(1);
  });
  test('renders Todo form', () => {
    const toDoForm = findByTestAttr(wrapper, 'to-do-form');
    expect(toDoForm.length).toBe(1);
  });
  test('renders text input', () => {
    const textInput = findByTestAttr(wrapper, 'text-input');
    expect(textInput.length).toBe(1);
  });
  test('renders submit button', () => {
    const btn = findByTestAttr(wrapper, 'btn');
    expect(btn.length).toBe(1);
  });
});

describe.skip('setValue, useState hook, events', () => {
  let wrapper;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setState]);
  // let mockSetValue = jest.fn();
  beforeEach(() => {
    // mockSetValue.mockClear();
    // React.useState = jest.fn(() => ['', mockSetValue]);
    wrapper = setup();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('state updates with value of input on change', () => {
    // step 1 -> create mock fn, sub React.useState with mock=>[initState, mock fn]
    // const mockSetValue = jest.fn();
    // React.useState = jest.fn(() => ['', mockSetValue]);

    // step 2 -> find input box
    // const wrapper = setup();
    const inputBox = findByTestAttr(wrapper, 'text-input');

    // step 3 -> simulate change event
    const mockEvent = { target: { value: 'wash dishes' } };
    inputBox.simulate('change', mockEvent);

    // step 4 -> expect mock fn toHaveBeenCalledWith with mockEvent.target.value
    // expect(mockSetValue).toHaveBeenCalledWith('wash dishes');
    expect(setState).toHaveBeenCalledWith('wash dishes');
  });

  test('clicking submit btn clears the input value', () => {
    // const btn = findByTestAttr(wrapper, 'btn');
    // const mockEvent = { preventDefault() {} };
    // btn.simulate('click', mockEvent);
    const form = findByTestAttr(wrapper, 'to-do-form');
    const mockEvent = { preventDefault() {} };
    form.simulate('submit', mockEvent);

    // expect(mockSetValue).toHaveBeenCalledWith('');
    expect(setState).toHaveBeenCalledWith('');
  });
});

// describe('setTodos, useState hook, addTodo, onSubmit', () => {
//   let wrapper;
//   const setState = jest.fn();
//   const useStateSpy = jest.spyOn(React, 'useState');
//   useStateSpy.mockImplementation((init) => [init, setState]);
//   beforeEach(() => {
//     wrapper = Enzyme.mount(<App />);
//   });
//   afterEach(() => {
//     jest.clearAllMocks();
//   });
//   test('submit', () => {
//     // findByTestAttr(wrapper, 'to-do-form')
//     //   .props()
//     //   .onSubmit({ preventDefault() {} });
//     const form = findByTestAttr(wrapper, 'to-do-form');
//     const mockEvent = { preventDefault() {} };
//     form.simulate('submit', mockEvent);
//     expect(setState).toHaveBeenCalledWith('');
//   });
// });

// describe('setTodos, useState hook, addTodo, onSubmit', () => {
//   test('submit', () => {
//     const mockSetTodos = jest.fn();
//     React.useState = jest.fn(()=>['', mockSetTodos])
//     const wrapper = mount(<App />);
//     console.log(wrapper.props());
//     findByTestAttr(wrapper, 'text-input').getDOMNode().value = 'New Todo';
//     const form = findByTestAttr(wrapper, 'to-do-form');
//     const mockSubmitEvt = { preventDefault() {} };
//     form.simulate('submit', mockSubmitEvt);
//   });
// });

// describe('setTodos, useState hook, addTodo, onSubmit', () => {
//   test('submit', () => {
//     // This strategy doesnt work because we need React.useState
//     // for [value, setValue] = React.useState<string>('');
//     // let mockSetTodos = jest.fn();
//     // React.useState = jest.fn(() => [[], mockSetTodos]);
//     // const wrapper = setup();
//     // const form = findByTestAttr(wrapper, 'to-do-form');
//     // const mockSubmitEvt = { preventDefault() {} };
//     // form.simulate('submit', mockSubmitEvt);
//     // expect(mockSetTodos).toHaveBeenCalledWith('hello')
//   })
// });
