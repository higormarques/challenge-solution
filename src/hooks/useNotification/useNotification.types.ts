export interface Notification {
    id: number;
    message: string;
    type: 'success' | 'error'
}

export interface NotificationContextProps {
    notifications: Notification[];
    notify: (message: string, type: 'success' | 'error') => void;
}