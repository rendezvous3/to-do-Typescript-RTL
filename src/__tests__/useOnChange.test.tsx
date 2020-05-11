import { act, renderHook } from '@testing-library/react-hooks';
import { useOnChange } from '../useOnChange';


describe('useOnChange Hook', () => {
  test('state updates with value of input on change', () => {
    const { result } = renderHook(useOnChange);

    act(() => {
      result.current.handleChange({ target: { value: 'train' } })
    })

    expect(result.current.value).toBe('train');
  });
});