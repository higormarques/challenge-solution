
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import NewUserPage from './';
import { RegistrationStatus } from '~/types/enums';
import useAddRegistration from '~/hooks/useAddRegistration';
import { NotificationProvider } from '~/hooks/useNotification';
import Notification from '~/components/Notification';

jest.mock('~/hooks/useAddRegistration');

const mockMutation = {
    mutate: jest.fn(),
};

(useAddRegistration as jest.Mock).mockReturnValue(mockMutation);

const queryClient = new QueryClient();

const createWrapper = () => {
    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            <NotificationProvider>
                <MemoryRouter>
                    {children}
                </MemoryRouter>
            </NotificationProvider>
        </QueryClientProvider>
    );
};

describe('NewUserPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render the form fields correctly', () => {
        render(<NewUserPage />, { wrapper: createWrapper() });

        expect(screen.getByLabelText('Nome')).toBeInTheDocument();
        expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
        expect(screen.getByLabelText('CPF')).toBeInTheDocument();
        expect(screen.getByLabelText('Data de admissão')).toBeInTheDocument();
    });

    it('should display validation errors when submitting empty form', async () => {
        render(<NewUserPage />, { wrapper: createWrapper() });

        fireEvent.click(screen.getByText('Cadastrar'));

        await waitFor(() => {
            expect(screen.getAllByText('Campo obrigatório').length).toBeGreaterThan(0);
        });
    });
});
