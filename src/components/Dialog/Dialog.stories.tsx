import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import Dialog from './';
import { DialogProps } from './Dialog.types';
import { NotificationProvider } from '~/hooks/useNotification';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Button from '~/components/Buttons';

const queryClient = new QueryClient();

const meta: Meta<DialogProps> = {
    title: 'Components/Dialog',
    component: Dialog,
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

const Template: StoryFn<DialogProps> = (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
            <Dialog {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
};

export const Default = Template.bind({});
Default.args = {
    title: 'Default Dialog',
    children: 'This is a default dialog',
};

export const WithLongContent = Template.bind({});
WithLongContent.args = {
    title: 'Dialog with Long Content',
    children: (
        <div>
            <p>This is a dialog with long content.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel velit orci. Suspendisse potenti.</p>
            <p>Sed euismod, justo vel sollicitudin efficitur, quam leo ullamcorper tortor, at laoreet est leo at risus.</p>
            <p>Donec vel mi sit amet elit scelerisque ultricies. Duis vehicula velit et tortor fermentum, id vehicula mi bibendum.</p>
            <p>Curabitur sed velit vitae odio tempus cursus. Integer a risus a neque suscipit posuere. In sed odio ac arcu tempor luctus.</p>
        </div>
    ),
};

export const WithoutTitle = Template.bind({});
WithoutTitle.args = {
    children: 'This dialog has no title',
};

export const NotOpen = Template.bind({});
NotOpen.args = {
    title: 'Hidden Dialog',
    children: 'This dialog is not open',
};
