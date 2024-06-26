import { renderHook, act } from '@testing-library/react-hooks';
import useDebounce from './';

jest.useFakeTimers();

describe('useDebounce hook', () => {
    it('should return the initial value', () => {
        const { result } = renderHook(() => useDebounce('initial', 500));

        expect(result.current).toBe('initial');
    });

    it('should update the value after the specified delay', () => {
        const { result } = renderHook(() => useDebounce('updated', 500));

        act(() => {
            jest.advanceTimersByTime(500);
        });

        expect(result.current).toBe('updated');
    });

    it('should only update the debounced value after the last update call within the delay period', () => {
        const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
            initialProps: { value: 'first' },
        });

        rerender({ value: 'second' });
        act(() => {
            jest.advanceTimersByTime(250);
        });
        rerender({ value: 'final' });
        act(() => {
            jest.advanceTimersByTime(250);
        });

        expect(result.current).not.toBe('final');

        act(() => {
            jest.advanceTimersByTime(250);
        });

        expect(result.current).toBe('final');
    });
});