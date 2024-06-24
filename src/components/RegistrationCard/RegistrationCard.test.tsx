import { render, screen, fireEvent } from '@testing-library/react';
import RegistrationCard from './';
import { RegistrationStatus } from '~/types/enums';
import { RegistrationCardProps } from './RegistrationCard.types';
import useUpdateRegistration from '~/hooks/useUpdateRegistration';
import useDeleteRegistration from '~/hooks/useDeleteRegistration';

jest.mock('~/hooks/useUpdateRegistration');
jest.mock('~/hooks/useDeleteRegistration');

const mockUpdateRegistration = useUpdateRegistration as jest.Mock;
const mockDeleteRegistration = useDeleteRegistration as jest.Mock;

const mockData: RegistrationCardProps = {
    data: {
        id: 1,
        employeeName: 'John Doe',
        email: 'john.doe@example.com',
        admissionDate: '2023-01-01',
        cpf: '123.456.789-00',
        status: RegistrationStatus.Review,
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
        render(<RegistrationCard {...mockData} />);
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
        expect(screen.getByText('2023-01-01')).toBeInTheDocument();
    });

    it('should open the dialog with appropriate message on "Reprovar" button click', () => {
        render(<RegistrationCard {...mockData} />);
        fireEvent.click(screen.getByText('Reprovar'));
        expect(screen.getByText('REPROVAR')).toBeInTheDocument();
        expect(screen.getByText('Você tem certeza que deseja reprovar esta inscrição?')).toBeInTheDocument();
    });

    it('should open the dialog with appropriate message on "Aprovar" button click', () => {
        render(<RegistrationCard {...mockData} />);
        fireEvent.click(screen.getByText('Aprovar'));
        expect(screen.getByText('APROVAR')).toBeInTheDocument();
        expect(screen.getByText('Você tem certeza que deseja aprovar esta inscrição?')).toBeInTheDocument();
    });

    it('should call update mutation on confirming status update', () => {
        render(<RegistrationCard {...mockData} />);
        fireEvent.click(screen.getByText('Aprovar'));
        fireEvent.click(screen.getByText('Confirmar'));
        expect(mockUpdateRegistration().mutate).toHaveBeenCalledWith({
            ...mockData.data,
            status: RegistrationStatus.Approved,
        });
    });
});
