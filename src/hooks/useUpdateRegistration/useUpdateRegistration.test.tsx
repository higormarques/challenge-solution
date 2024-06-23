// src/hooks/useUpdateRegistration.test.ts
import { renderHook, act } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useUpdateRegistration from './';
import { Registration } from '~/types/types';

const createWrapper = () => {
    const queryClient = new QueryClient();
    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

describe('useUpdateRegistration', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('successfully updates a registration', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve<Registration>({
                    id: 1,
                    admissionDate: '2023-01-01',
                    email: 'john.doe@example.com',
                    employeeName: 'John Doe',
                    status: 'active',
                    cpf: '123.456.789-00',
                }),
            })
        ) as jest.Mock;

        const { result, waitFor } = renderHook(() => useUpdateRegistration(), {
            wrapper: createWrapper(),
        });

        await act(async () => {
            result.current.mutate({
                id: 1,
                admissionDate: '2023-01-01',
                email: 'john.doe@example.com',
                employeeName: 'John Doe',
                status: 'active',
                cpf: '123.456.789-00',
            });
        });

        await waitFor(() => result.current.isSuccess);

        expect(result.current.status).toBe('success');
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('http://localhost:3000/registrations/1', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: 1,
                admissionDate: '2023-01-01',
                email: 'john.doe@example.com',
                employeeName: 'John Doe',
                status: 'active',
                cpf: '123.456.789-00',
            }),
        });
    });

    it('handles failure when updating a registration', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                status: 400,
                json: () => Promise.resolve({ error: 'Failed to update status' }),
            })
        ) as jest.Mock;

        const { result, waitFor } = renderHook(() => useUpdateRegistration(), {
            wrapper: createWrapper(),
        });

        await act(async () => {
            result.current.mutate({
                id: 1,
                admissionDate: '2023-01-01',
                email: 'john.doe@example.com',
                employeeName: 'John Doe',
                status: 'active',
                cpf: '123.456.789-00',
            });
        });

        await waitFor(() => result.current.isError);

        expect(result.current.status).toBe('error');
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('http://localhost:3000/registrations/1', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: 1,
                admissionDate: '2023-01-01',
                email: 'john.doe@example.com',
                employeeName: 'John Doe',
                status: 'active',
                cpf: '123.456.789-00',
            }),
        });
    });
});
