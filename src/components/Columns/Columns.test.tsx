import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Columns from './';
import { Registration } from '~/types/types';
import { RegistrationStatus } from '~/types/enums';
import { NotificationProvider } from '~/hooks/useNotification';

const mockRegistrations: Registration[] = [
    {
        id: 1,
        admissionDate: '2023-01-01',
        email: 'john.doe@example.com',
        employeeName: 'John Doe',
        status: RegistrationStatus.Review,
        cpf: '123.456.789-00',
    },
    {
        id: 2,
        admissionDate: '2023-01-02',
        email: 'jane.doe@example.com',
        employeeName: 'Jane Doe',
        status: RegistrationStatus.Approved,
        cpf: '987.654.321-00',
    },
    {
        id: 3,
        admissionDate: '2023-01-03',
        email: 'richard.roe@example.com',
        employeeName: 'Richard Roe',
        status: RegistrationStatus.Reproved,
        cpf: '456.123.789-00',
    },
];

const queryClient = new QueryClient();

const createWrapper = () => {
    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            <NotificationProvider>{children}</NotificationProvider>
        </QueryClientProvider>
    );
};

describe('Columns', () => {
    it('should render the columns with titles', () => {
        render(<Columns registrations={mockRegistrations} />, { wrapper: createWrapper() });

        expect(screen.getByText('Pronto para revisar')).toBeInTheDocument();
        expect(screen.getByText('Aprovado')).toBeInTheDocument();
        expect(screen.getByText('Reprovado')).toBeInTheDocument();
    });

    it('should render the correct number of registration cards in each column', () => {
        render(<Columns registrations={mockRegistrations} />, { wrapper: createWrapper() });

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Jane Doe')).toBeInTheDocument();
        expect(screen.getByText('Richard Roe')).toBeInTheDocument();
    });

    it('should render registration cards in the correct columns based on their status', () => {
        render(<Columns registrations={mockRegistrations} />, { wrapper: createWrapper() });

        const reviewColumn = screen.getByText('Pronto para revisar').closest('div');
        const approvedColumn = screen.getByText('Aprovado').closest('div');
        const reprovedColumn = screen.getByText('Reprovado').closest('div');

        expect(reviewColumn).toContainElement(screen.getByText('John Doe'));
        expect(approvedColumn).toContainElement(screen.getByText('Jane Doe'));
        expect(reprovedColumn).toContainElement(screen.getByText('Richard Roe'));
    });

    it('should not render any registration cards if no registrations are provided', () => {
        render(<Columns registrations={[]} />, { wrapper: createWrapper() });

        expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
        expect(screen.queryByText('Jane Doe')).not.toBeInTheDocument();
        expect(screen.queryByText('Richard Roe')).not.toBeInTheDocument();
    });
});
