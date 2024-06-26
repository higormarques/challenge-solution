// Button.test.tsx
import { render } from '@testing-library/react';
import Button, { ButtonSmall, IconButton } from './';

describe('Button components', () => {
    it('should render Button with correct styles', () => {
        const { getByRole } = render(<Button>Click Me</Button>);
        const button = getByRole('button');
        expect(button).toHaveStyle('background-color: #64a98c');
        expect(button).toHaveStyle('color: #fff');
        expect(button).toHaveStyle('height: 56px');
    });

    it('should render ButtonSmall with default styles', () => {
        const { getByRole } = render(<ButtonSmall>Small Button</ButtonSmall>);
        const buttonSmall = getByRole('button');
        expect(buttonSmall).toHaveStyle('font-size: 12px');
        expect(buttonSmall).toHaveStyle('color: #000');
    });

    it('should render ButtonSmall with custom styles', () => {
        const { getByRole } = render(
            <ButtonSmall bgcolor="blue" color="white">
                Custom Small Button
            </ButtonSmall>
        );
        const buttonSmall = getByRole('button');
        expect(buttonSmall).toHaveStyle('background-color: blue');
        expect(buttonSmall).toHaveStyle('color: white');
    });

    it('should render IconButton with correct styles', () => {
        const { getByRole } = render(<IconButton>Icon</IconButton>);
        const iconButton = getByRole('button');
        expect(iconButton).toHaveStyle('border: 2px solid #64a98c');
        expect(iconButton).toHaveStyle('background-color: transparent');
    });
});
