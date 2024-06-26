import { render, screen } from '@testing-library/react';
import Loading from './';

describe('Loading Component', () => {
    it('should render the Loading component', () => {
        render(<Loading />);
        const loadingContainer = screen.getByTestId('loading-container');
        expect(loadingContainer).toBeInTheDocument();
    });

    it('should contain a Spinner', () => {
        render(<Loading />);
        const spinner = screen.getByTestId('spinner');
        expect(spinner).toBeInTheDocument();
    });
});
