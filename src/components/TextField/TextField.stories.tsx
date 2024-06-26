import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import TextField from './';
import { TextFieldProps } from './TextField.types';

const meta: Meta<typeof TextField> = {
    title: 'Components/TextField',
    component: TextField,
    tags: ['autodocs'],
};

export default meta;

const Template: StoryFn<TextFieldProps> = (args) => {
    const [value, setValue] = useState(args.value || '');
    return (
        <TextField
            {...args}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
};

export const Default = Template.bind({});
Default.args = {
    id: 'default',
    label: 'Default Label',
    placeholder: 'Enter text here',
};

export const WithError = Template.bind({});
WithError.args = {
    id: 'with-error',
    label: 'Label with Error',
    placeholder: 'Enter text here',
    error: 'This field is required',
};

export const Disabled = Template.bind({});
Disabled.args = {
    id: 'disabled',
    label: 'Disabled Label',
    placeholder: 'Enter text here',
    disabled: true,
};

export const WithInitialValue = Template.bind({});
WithInitialValue.args = {
    id: 'with-initial-value',
    label: 'Label with Initial Value',
    placeholder: 'Enter text here',
    value: 'Initial value',
};
