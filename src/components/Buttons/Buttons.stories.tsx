import { Meta, StoryObj } from '@storybook/react';
import Button, { ButtonSmall, IconButton } from './';
import { HiOutlineMail } from 'react-icons/hi';

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    subcomponents: { ButtonSmall, IconButton },
    tags: ['autodocs'],
    argTypes: {
        children: {
            control: 'text',
            description: 'Content of the button',
        },
        bgcolor: {
            control: 'color',
            description: 'Background color of the button (ButtonSmall only)',
        },
        color: {
            control: 'color',
            description: 'Text color of the button (ButtonSmall only)',
        },
    },
    parameters: {
        docs: {
            description: {
                component: 'A collection of different button components with various styles and functionalities.',
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        children: 'Default Button',
    },
};

type ButtonSmallStory = StoryObj<typeof ButtonSmall>;

export const SmallDefault: ButtonSmallStory = {
    args: {
        children: 'Small Default',
    },
};

export const SmallColored: ButtonSmallStory = {
    args: {
        children: 'Small Colored',
        bgcolor: '#FF5733',
        color: '#FFF',
    },
};

type IconButtonStory = StoryObj<typeof IconButton>;

export const DefaultIcon: IconButtonStory = {
    render: (args: StoryObj<typeof IconButton>) => (
        <IconButton {...args} >
            <HiOutlineMail />
        </IconButton>
    ),
};

export const CustomIconColor: IconButtonStory = {
    render: (args: StoryObj<typeof IconButton>) => (
        <IconButton {...args} style={{ borderColor: '#FF5733' }}>
            <HiOutlineMail style={{ color: '#FF5733' }} />
        </IconButton>
    ),
};
