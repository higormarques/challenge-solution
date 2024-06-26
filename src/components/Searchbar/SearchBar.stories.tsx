import { Meta, StoryFn } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SearchBar from './';
import { SearchBarProps } from './SearchBar.types';
import { NotificationProvider } from '~/hooks/useNotification';

const queryClient = new QueryClient();

const meta: Meta<typeof SearchBar> = {
    title: 'Components/SearchBar',
    component: SearchBar,
    decorators: [
        (Story) => (
            <MemoryRouter>
                <QueryClientProvider client={queryClient}>
                    <NotificationProvider>
                        <Story />
                    </NotificationProvider>
                </QueryClientProvider>
            </MemoryRouter>
        ),
    ],
    tags: ['autodocs'],
};

export default meta;

const Template: StoryFn<SearchBarProps> = (args) => <SearchBar {...args} />;

export const Default = Template.bind({});
Default.args = {
    handleSearch: (value) => console.log(value),
};

export const WithInvalidCPF = Template.bind({});
WithInvalidCPF.args = {
    handleSearch: (value) => console.log(value),
};
WithInvalidCPF.play = async ({ canvasElement }) => {
    const input = canvasElement.querySelector('input');
    input && (input.value = '123.456.789-00');
};

export const WithValidCPF = Template.bind({});
WithValidCPF.args = {
    handleSearch: (value) => console.log(value),
};
WithValidCPF.play = async ({ canvasElement }) => {
    const input = canvasElement.querySelector('input');
    input && (input.value = '123.456.789-09');
};