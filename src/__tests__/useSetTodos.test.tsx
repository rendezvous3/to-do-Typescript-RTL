import { act, renderHook } from '@testing-library/react-hooks';
import { useSetTodos } from '../useSetTodos';


describe('useSetTodos Hook', () => {
  test('adds new todo', () => {
    const { result } = renderHook(useSetTodos);

    act(() => {
      result.current.addTodo('new Todo');
    });

    expect(result.current.todos).toStrictEqual([{ text: 'new Todo', complete: false }]);
  });
});
