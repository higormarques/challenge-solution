import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import NewUserPage from './';
import { RegistrationStatus } from '~/types/enums';
import useAddRegistration from '~/hooks/useAddRegistration';
import { NotificationProvider } from '~/hooks/useNotification';
import { Notification } from '~/components';

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

    it('should display validation errors when submitting empty form', async () => {
        render(<NewUserPage />, { wrapper: createWrapper() });

        fireEvent.click(screen.getByText('Cadastrar'));

        await waitFor(() => {
            expect(screen.getAllByText('Campo obrigatório').length).toBeGreaterThan(0);
        });
    });

    it('should call mutate function on form submission with valid data', async () => {
        render(<NewUserPage />, { wrapper: createWrapper() });

        fireEvent.input(screen.getByLabelText('Nome'), {
            target: { value: 'John Doe' },
        });
        fireEvent.input(screen.getByLabelText('E-mail'), {
            target: { value: 'john.doe@example.com' },
        });
        fireEvent.input(screen.getByLabelText('CPF'), {
            target: { value: '785.022.700-01' },
        });
        fireEvent.input(screen.getByLabelText('Data de admissão'), {
            target: { value: '2024-06-11' },
        });
        fireEvent.click(screen.getByText('Cadastrar'));

        await waitFor(() => {
            expect(mockMutation.mutate).toHaveBeenCalledWith(
                {
                    employeeName: 'John Doe',
                    email: 'john.doe@example.com',
                    cpf: '78502270001',
                    admissionDate: new Date('2024-06-11').toLocaleDateString('pt-BR'),
                    status: RegistrationStatus.Review,
                },
                expect.any(Object)
            );
        });
    });

    it('should display success notification on successful form submission', async () => {
        mockMutation.mutate.mockImplementationOnce((_, { onSuccess }) => {
            onSuccess();
        });

        render(
            <>
                <NewUserPage />
                <Notification />
            </>,
            { wrapper: createWrapper() }
        );

        fireEvent.input(screen.getByLabelText('Nome'), {
            target: { value: 'John Doe' },
        });
        fireEvent.input(screen.getByLabelText('E-mail'), {
            target: { value: 'john.doe@example.com' },
        });
        fireEvent.input(screen.getByLabelText('CPF'), {
            target: { value: '785.022.700-01' },
        });
        fireEvent.input(screen.getByLabelText('Data de admissão'), {
            target: { value: '2023-10-22' },
        });
        fireEvent.click(screen.getByText('Cadastrar'));

        await waitFor(() => {
            expect(screen.getByText('Cadastro realizado com sucesso')).toBeInTheDocument();
        });
    });

    it('should display error notification on form submission failure', async () => {
        mockMutation.mutate.mockImplementationOnce((_, { onError }) => {
            onError();
        });

        render(
            <>
                <NewUserPage />
                <Notification />
            </>,
            { wrapper: createWrapper() }
        );

        fireEvent.input(screen.getByLabelText('Nome'), {
            target: { value: 'John Doe' },
        });
        fireEvent.input(screen.getByLabelText('E-mail'), {
            target: { value: 'john.doe@example.com' },
        });
        fireEvent.input(screen.getByLabelText('CPF'), {
            target: { value: '785.022.700-01' },
        });
        fireEvent.input(screen.getByLabelText('Data de admissão'), {
            target: { value: '2023-10-22' },
        });
        fireEvent.click(screen.getByText('Cadastrar'));

        await waitFor(() => {
            expect(screen.getByText('Erro ao cadastrar usuário')).toBeInTheDocument();
        });
    });
});
