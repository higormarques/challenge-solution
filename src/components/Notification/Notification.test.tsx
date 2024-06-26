import { render, screen } from '@testing-library/react';
import { useNotification } from '../../hooks/useNotification';
import { Notification as NotificationType } from '~/hooks/useNotification/useNotification.types';
import Notification from './';

jest.mock('../../hooks/useNotification');

const mockUseNotification = useNotification as jest.MockedFunction<typeof useNotification>;

describe('Notification Component', () => {
    it('should render the Notification component', () => {
        mockUseNotification.mockReturnValue({
            notifications: [],
            notify: jest.fn()
        });

        render(<Notification />);
        const notificationContainer = screen.getByTestId('notification-container');
        expect(notificationContainer).toBeInTheDocument();
    });

    it('should display notifications', () => {
        const notifications: NotificationType[] = [
            { id: 1, message: 'Test notification 1', type: 'success' },
            { id: 2, message: 'Test notification 2', type: 'error' },
        ];

        mockUseNotification.mockReturnValue({
            notifications,
            notify: jest.fn()
        });

        render(<Notification />);
        notifications.forEach(notification => {
            expect(screen.getByText(notification.message)).toBeInTheDocument();
        });
    });

    it('should have correct notification types', () => {
        const notifications: NotificationType[] = [
            { id: 1, message: 'Success notification', type: 'success' },
            { id: 2, message: 'Error notification', type: 'error' },
        ];

        mockUseNotification.mockReturnValue({
            notifications,
            notify: jest.fn()
        });

        render(<Notification />);
        notifications.forEach(notification => {
            const notificationItem = screen.getByText(notification.message);
            expect(notificationItem).toHaveAttribute('type', notification.type);
        });
    });
});
