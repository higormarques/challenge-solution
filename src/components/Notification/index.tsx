import { useNotification } from '../../hooks/useNotification';
import { NotificationContainer, NotificationItem } from './Notification.styles';

const Notification = () => {
    const { notifications } = useNotification();

    return (
        <NotificationContainer>
            {notifications.map(notification => (
                <NotificationItem
                    key={notification.id}
                    type={notification.type}
                >
                    {notification.message}
                </NotificationItem>
            ))}
        </NotificationContainer>
    );
};

export default Notification;
