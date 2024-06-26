import { render, screen, fireEvent } from '@testing-library/react';
import Dialog from './';

const DialogProps = {
    isOpen: true,
    onClose: jest.fn(),
    title: "Dialog Title",
    children: <div>Dialog Body</div>
};

describe('Dialog Component', () => {
    it('should not render the dialog when isOpen is false', () => {
        render(<Dialog {...DialogProps} isOpen={false} />);
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should render the dialog with title and body when isOpen is true', () => {
        render(<Dialog {...DialogProps} />);
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByText('Dialog Title')).toBeInTheDocument();
        expect(screen.getByText('Dialog Body')).toBeInTheDocument();
    });

    it('should call onClose when the close button is clicked', () => {
        render(<Dialog {...DialogProps} />);
        fireEvent.click(screen.getByLabelText(/close dialog/i));
        expect(DialogProps.onClose).toHaveBeenCalledTimes(1);
    });
});
