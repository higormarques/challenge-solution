// Notification.stories.tsx

import { Meta, StoryFn } from '@storybook/react';
import Button from '~/components/Buttons';
import Notification from './';
import { NotificationProvider, useNotification } from '~/hooks/useNotification';

import { NotificationContextProps } from '~/hooks/useNotification/useNotification.types';

const meta: Meta = {
    title: 'Components/Notification',
    component: Notification,
    tags: ['autodocs'],
    decorators: [(Story) => <NotificationProvider><Story /></NotificationProvider>],
};

export default meta;

const Template: StoryFn = (args) => {
    const { notify } = useNotification() as NotificationContextProps;

    return (
        <>
            <Button onClick={() => notify('This is a test notification', 'success')}>
                Trigger Notification
            </Button>
            <Notification {...args} />
        </>
    )
};

export const Default = Template.bind({});

export const WithSuccessType: StoryFn = (args) => {
    const { notify } = useNotification() as NotificationContextProps;

    return (
        <>
            <Button onClick={() => notify('This is a test notification', 'success')}>
                Trigger Notification
            </Button>
            <Notification {...args} />
        </>
    );
};

export const WithErrorType: StoryFn = (args) => {
    const { notify } = useNotification() as NotificationContextProps;

    return (
        <>
            <Button onClick={() => notify('This is a test notification', 'error')}>
                Trigger Notification
            </Button>
            <Notification {...args} />
        </>
    );
}
