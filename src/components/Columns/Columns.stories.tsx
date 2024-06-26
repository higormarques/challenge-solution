import { Meta, StoryFn } from '@storybook/react';
import Collumns from './';
import { Registration } from '~/types/types';
import { RegistrationStatus } from '~/types/enums';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NotificationProvider } from '~/hooks/useNotification';
import { ColumnsProps } from './Columns.types';

const queryClient = new QueryClient();

const meta: Meta<ColumnsProps> = {
    title: 'Components/Collumns',
    component: Collumns,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <QueryClientProvider client={queryClient}>
                <NotificationProvider>
                    <Story />
                </NotificationProvider>
            </QueryClientProvider>
        ),
    ],
};

export default meta;

const Template: StoryFn<ColumnsProps> = (args) => <Collumns {...args} />;

const mockRegistrations: Registration[] = [
    { id: 1, admissionDate: '2023-01-01', email: 'john.doe@example.com', employeeName: 'John Doe', status: RegistrationStatus.Review, cpf: '123.456.789-00' },
    { id: 2, admissionDate: '2023-01-02', email: 'jane.doe@example.com', employeeName: 'Jane Doe', status: RegistrationStatus.Approved, cpf: '987.654.321-00' },
    { id: 3, admissionDate: '2023-01-03', email: 'jim.doe@example.com', employeeName: 'Jim Doe', status: RegistrationStatus.Reproved, cpf: '111.222.333-44' },
];

// Histórias para Collumns
export const Default = Template.bind({});
Default.args = {
    registrations: mockRegistrations,
};

export const NoRegistrations = Template.bind({});
NoRegistrations.args = {
    registrations: [],
};

export const OnlyReview = Template.bind({});
OnlyReview.args = {
    registrations: mockRegistrations.filter(reg => reg.status === RegistrationStatus.Review),
};

export const OnlyApproved = Template.bind({});
OnlyApproved.args = {
    registrations: mockRegistrations.filter(reg => reg.status === RegistrationStatus.Approved),
};

export const OnlyReproved = Template.bind({});
OnlyReproved.args = {
    registrations: mockRegistrations.filter(reg => reg.status === RegistrationStatus.Reproved),
};
