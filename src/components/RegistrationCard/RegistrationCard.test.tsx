import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RegistrationCard from './';
import { RegistrationStatus } from '~/types/enums';
import { RegistrationCardProps } from './RegistrationCard.types';
import useUpdateRegistration from '~/hooks/useUpdateRegistration';
import useDeleteRegistration from '~/hooks/useDeleteRegistration';
import { NotificationProvider } from '~/hooks/useNotification';

jest.mock('~/hooks/useUpdateRegistration');
jest.mock('~/hooks/useDeleteRegistration');

const mockUpdateRegistration = useUpdateRegistration as jest.Mock;
const mockDeleteRegistration = useDeleteRegistration as jest.Mock;

const queryClient = new QueryClient();

const createWrapper = () => {
    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            <NotificationProvider>{children}</NotificationProvider>
        </QueryClientProvider>
    );
};

const mockData: RegistrationCardProps = {
    data: {
        id: 1,
        employeeName: 'John Doe',
        email: 'john.doe@example.com',
        admissionDate: '2023-01-01',
        status: RegistrationStatus.Review,
        cpf: '123.456.789-00',
    },
};

const mockApprovedData: RegistrationCardProps = {
    data: {
        id: 1,
        employeeName: 'John Doe',
        email: 'john.doe@example.com',
        admissionDate: '2023-01-01',
        status: RegistrationStatus.Approved,
        cpf: '123.456.789-00',
    },
};

describe('RegistrationCard', () => {
    beforeEach(() => {
        mockUpdateRegistration.mockReturnValue({
            mutate: jest.fn(),
        });
        mockDeleteRegistration.mockReturnValue({
            mutate: jest.fn(),
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render the registration card with employee details', () => {
        render(<RegistrationCard {...mockData} />, { wrapper: createWrapper() });

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
        expect(screen.getByText('2023-01-01')).toBeInTheDocument();
    });

    it('should open the dialog with appropriate message on "Reprovar" button click', () => {
        render(<RegistrationCard {...mockData} />, { wrapper: createWrapper() });

        fireEvent.click(screen.getByText('Reprovar'));
        expect(screen.getByText('REPROVAR')).toBeInTheDocument();
        expect(screen.getByText('Você tem certeza que deseja reprovar esta inscrição?')).toBeInTheDocument();
    });

    it('should open the dialog with appropriate message on "Aprovar" button click', () => {
        render(<RegistrationCard {...mockData} />, { wrapper: createWrapper() });

        fireEvent.click(screen.getByText('Aprovar'));
        expect(screen.getByText('APROVAR')).toBeInTheDocument();
        expect(screen.getByText('Você tem certeza que deseja aprovar esta inscrição?')).toBeInTheDocument();
    });

    it('should open the dialog with appropriate message on "Revisar novamente" button click', () => {
        render(<RegistrationCard {...mockApprovedData} />, { wrapper: createWrapper() });

        fireEvent.click(screen.getByTestId('revisar-novamente'));
        expect(screen.getByText('REVISAR NOVAMENTE')).toBeInTheDocument();
        expect(screen.getByText('Você tem certeza que deseja revisar novamente esta inscrição?')).toBeInTheDocument();
    });

    it('should open the dialog with appropriate message on trash icon click', () => {
        render(<RegistrationCard {...mockData} />, { wrapper: createWrapper() });

        fireEvent.click(screen.getByTestId('trash-icon'));
        expect(screen.getByText('EXCLUIR')).toBeInTheDocument();
        expect(screen.getByText('Você tem certeza que deseja excluir esta inscrição?')).toBeInTheDocument();
    });

    it('should call update mutation on confirming status update', async () => {
        const mutate = jest.fn((_, { onSuccess }) => onSuccess());
        mockUpdateRegistration.mockReturnValue({ mutate });

        render(<RegistrationCard {...mockData} />, { wrapper: createWrapper() });

        fireEvent.click(screen.getByText('Aprovar'));
        fireEvent.click(screen.getByText('Confirmar'));

        await waitFor(() => {
            expect(mutate).toHaveBeenCalledWith(
                { ...mockData.data, status: RegistrationStatus.Approved },
                expect.objectContaining({ onSuccess: expect.any(Function), onError: expect.any(Function) })
            );
        });
    });

    it('should call delete mutation on confirming deletion', async () => {
        const mutate = jest.fn();
        mockDeleteRegistration.mockReturnValue({ mutate });

        render(<RegistrationCard {...mockData} />, { wrapper: createWrapper() });

        fireEvent.click(screen.getByTestId('trash-icon'));
        fireEvent.click(screen.getByText('Excluir'));

        await waitFor(() => {
            expect(mutate).toHaveBeenCalledWith(
                mockData.data.id,
                expect.objectContaining({ onSuccess: expect.any(Function), onError: expect.any(Function) })
            );
        });
    });
});
