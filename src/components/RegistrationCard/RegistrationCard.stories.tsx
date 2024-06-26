import { Meta, StoryFn } from '@storybook/react';
import RegistrationCard from './';
import { NotificationProvider } from '~/hooks/useNotification';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RegistrationStatus } from '~/types/enums';
import { RegistrationCardProps } from './RegistrationCard.types';

const meta: Meta<RegistrationCardProps> = {
    title: 'Components/RegistrationCard',
    component: RegistrationCard,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <QueryClientProvider client={new QueryClient()}>
                <NotificationProvider>
                    <Story />
                </NotificationProvider>
            </QueryClientProvider>
        ),
    ],
};

export default meta;

const Template: StoryFn<typeof RegistrationCard> = (args) => <RegistrationCard {...args} />;

export const Review = Template.bind({});
Review.args = {
    data: {
        id: 1,
        employeeName: 'John Doe',
        email: 'john.doe@example.com',
        admissionDate: '2023-01-01',
        cpf: '123.456.789-00',
        status: RegistrationStatus.Review,
    },
};

export const Approved = Template.bind({});
Approved.args = {
    data: {
        id: 2,
        employeeName: 'Jane Doe',
        email: 'jane.doe@example.com',
        admissionDate: '2023-01-02',
        cpf: '123.456.789-01',
        status: RegistrationStatus.Approved,
    },
};

export const Reproved = Template.bind({});
Reproved.args = {
    data: {
        id: 3,
        employeeName: 'Jake Doe',
        email: 'jake.doe@example.com',
        admissionDate: '2023-01-03',
        cpf: '123.456.789-02',
        status: RegistrationStatus.Reproved,
    },
};
