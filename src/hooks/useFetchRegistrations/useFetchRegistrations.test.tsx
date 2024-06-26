import { renderHook, act } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useFetchRegistrations from './';
import { Registration } from '~/types/types';

const mockRegistrations: Registration[] = [
    { id: 1, admissionDate: '2023-01-01', email: 'john.doe@example.com', employeeName: 'John Doe', status: 'active', cpf: '123.456.789-00' },
    { id: 2, admissionDate: '2023-01-02', email: 'jane.doe@example.com', employeeName: 'Jane Doe', status: 'inactive', cpf: '987.654.321-00' },
];

const createWrapper = () => {
    const queryClient = new QueryClient();
    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

describe('useFetchRegistrations', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch registrations successfully', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockRegistrations),
            })
        ) as jest.Mock;

        const { result, waitFor } = renderHook(() => useFetchRegistrations(''), {
            wrapper: createWrapper(),
        });

        await act(async () => {
            await waitFor(() => result.current.isSuccess);
        });

        expect(result.current.data).toEqual(mockRegistrations);
        expect(result.current.isError).toBe(false);
    });
});
