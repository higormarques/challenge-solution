
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SearchBar from '.';
import { maskCPF, validateCPF } from '~/utils/cpf-utils';
import useDebounce from '~/hooks/useDebounce';
import routes from "~/router/routes";


jest.mock('~/utils/cpf-utils');
jest.mock('~/hooks/useDebounce');

const mockMaskCPF = maskCPF as jest.Mock;
const mockValidateCPF = validateCPF as jest.Mock;
const mockUseDebounce = useDebounce as jest.Mock;

const createWrapper = () => {
    const queryClient = new QueryClient();
    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

const setup = (handleSearch = jest.fn()) => {
    const history = createMemoryHistory();
    render(
        <Router history={history}>
            <SearchBar handleSearch={handleSearch} />
        </Router>,
        { wrapper: createWrapper() }
    );
    return { history, handleSearch };
};

describe('SearchBar', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockUseDebounce.mockImplementation((value) => value);
    });

    it('should render the SearchBar with input and buttons', () => {
        setup();
        expect(screen.getByPlaceholderText('Digite um CPF válido')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Nova Admissão/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /refetch/i })).toBeInTheDocument();
    });

    it('should mask input value on change', () => {
        mockMaskCPF.mockImplementation((value) => value);
        setup();
        const input = screen.getByPlaceholderText('Digite um CPF válido');
        fireEvent.input(input, { target: { value: '12345678900' } });
        expect(mockMaskCPF).toHaveBeenCalledWith('12345678900');
    });

    it('should display error for an invalid CPF', () => {
        mockValidateCPF.mockReturnValue(false);
        setup();
        const input = screen.getByPlaceholderText('Digite um CPF válido');
        fireEvent.input(input, { target: { value: '123.456.789-00' } });
        expect(screen.getByText('CPF inválido')).toBeInTheDocument();
    });

    it('should call handleSearch with valid CPF', () => {
        mockValidateCPF.mockReturnValue(true);
        const { handleSearch } = setup();
        const input = screen.getByPlaceholderText('Digite um CPF válido');
        fireEvent.input(input, { target: { value: '123.456.789-00' } });
        expect(handleSearch).toHaveBeenCalledWith('12345678900');
    });

    it('should navigate to new admission page on button click', () => {
        const { history } = setup();
        const button = screen.getByRole('button', { name: /Nova Admissão/i });
        fireEvent.click(button);
        expect(history.location.pathname).toBe(routes.newUser);
    });
});
