import { Meta, StoryFn } from '@storybook/react';
import Loading from './';

const meta: Meta<typeof Loading> = {
    title: 'Components/Loading',
    component: Loading,
    tags: ['autodocs'],
};

export default meta;

const Template: StoryFn = (args) => <Loading {...args} />;

export const Default = Template.bind({});
Default.args = {};
