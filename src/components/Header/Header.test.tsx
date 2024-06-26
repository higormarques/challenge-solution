import { render, screen } from '@testing-library/react';
import Header from './';

describe('Header Component', () => {
    it('should render the Header component', () => {
        render(<Header />);
        const headerElement = screen.getByRole('banner');
        expect(headerElement).toBeInTheDocument();
    });

    it('should display the correct title', () => {
        render(<Header>Header Title</Header>);
        const titleElement = screen.getByText('Header Title');
        expect(titleElement).toBeInTheDocument();
    });
});
