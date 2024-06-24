import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextField from './';
import { TextFieldProps } from './TextField.types';

describe('TextField', () => {
    const defaultProps: TextFieldProps = {
        id: 'test-id',
        label: 'Test Label',
        error: '',
        onChange: jest.fn(),
    };

    it('should render the TextField with correct label', () => {
        render(<TextField {...defaultProps} />);

        const label = screen.getByLabelText('Test Label');
        expect(label).toBeInTheDocument();
    });

    it('should forward the ref to the input element', () => {
        const ref = createRef<HTMLInputElement>();
        render(<TextField {...defaultProps} ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it('should display error message when error prop is provided', () => {
        render(<TextField {...defaultProps} error="Test error" />);

        const errorMessage = screen.getByText('Test error');
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage).toHaveStyle('color: red');
    });

    it('should call onChange when input value changes', async () => {
        render(<TextField {...defaultProps} />);

        const input = screen.getByLabelText('Test Label') as HTMLInputElement;
        await userEvent.type(input, 'Hello');

        expect(defaultProps.onChange).toHaveBeenCalled();
    });
});

describe('TextField', () => {
    const defaultProps: TextFieldProps = {
        id: 'test-id',
        label: 'Test Label',
        error: '',
        onChange: jest.fn(),
    };

    it('should render the TextField with correct label', () => {
        render(<TextField {...defaultProps} />);

        const label = screen.getByLabelText('Test Label');
        expect(label).toBeInTheDocument();
    });

    it('should forward the ref to the input element', () => {
        const ref = createRef<HTMLInputElement>();
        render(<TextField {...defaultProps} ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it('should display error message when error prop is provided', () => {
        render(<TextField {...defaultProps} error="Test error" />);

        const errorMessage = screen.getByText('Test error');
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage).toHaveStyle('color: red');
    });

    it('should call onChange when input value changes', async () => {
        render(<TextField {...defaultProps} />);

        const input = screen.getByLabelText('Test Label') as HTMLInputElement;
        await userEvent.type(input, 'Hello');

        expect(defaultProps.onChange).toHaveBeenCalled();
    });
});
