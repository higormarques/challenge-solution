import { renderHook, act } from '@testing-library/react-hooks';
import { NotificationProvider, useNotification } from './';

const createWrapper = () => {
    return ({ children }: { children: React.ReactNode }) => (
        <NotificationProvider>{children}</NotificationProvider>
    );
};

describe('useNotification', () => {
    it('should add a notification', () => {
        const { result } = renderHook(() => useNotification(), { wrapper: createWrapper() });

        act(() => {
            result.current.notify('Test notification', 'success');
        });

        expect(result.current.notifications.length).toBe(1);
        expect(result.current.notifications[0].message).toBe('Test notification');
        expect(result.current.notifications[0].type).toBe('success');
    });

    it('should remove a notification after timeout', () => {
        jest.useFakeTimers();
        const { result } = renderHook(() => useNotification(), { wrapper: createWrapper() });

        act(() => {
            result.current.notify('Test notification', 'success');
        });

        expect(result.current.notifications.length).toBe(1);

        act(() => {
            jest.advanceTimersByTime(2000);
        });

        expect(result.current.notifications.length).toBe(0);
    });
});
