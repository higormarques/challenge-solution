import { createContext, useState, useContext, ReactNode } from 'react';
import { NotificationContextProps, Notification } from './useNotification.types';

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const useNotification = (): NotificationContextProps => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const notify = (message: string, type: 'success' | 'error') => {
        const id = new Date().getTime();
        setNotifications([...notifications, { id, message, type }]);

        setTimeout(() => {
            setNotifications(notifications => notifications.filter(notification => notification.id !== id));
        }, 2000);
    };

    return (
        <NotificationContext.Provider value={{ notifications, notify }
        }>
            {children}
        </NotificationContext.Provider>
    );
};
