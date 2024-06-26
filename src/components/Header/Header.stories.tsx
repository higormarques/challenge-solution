import { Meta, StoryFn } from '@storybook/react';
import Header from './';

const meta: Meta<typeof Header> = {
    title: 'Components/Header',
    component: Header,
    tags: ['autodocs'],
};

export default meta;

const Template: StoryFn = (args) => <Header {...args}><h1>Caju</h1></Header>;

export const Default = Template.bind({});
Default.args = {};
