// src/hooks/useAddRegistration.test.ts
import { renderHook, act } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useAddRegistration from './';

const createWrapper = () => {
    const queryClient = new QueryClient();
    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

describe('useAddRegistration', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('successfully adds a registration', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    admissionDate: "22/10/2023",
                    email: "filipe@caju.com.br",
                    employeeName: "Filipe Marins",
                    status: "REVIEW",
                    cpf: "78502270001"
                }),
            })
        ) as jest.Mock;

        const { result, waitFor } = renderHook(() => useAddRegistration(), {
            wrapper: createWrapper(),
        });

        await act(async () => {
            result.current.mutate({
                admissionDate: "22/10/2023",
                email: "filipe@caju.com.br",
                employeeName: "Filipe Marins",
                status: "REVIEW",
                cpf: "78502270001"
            });
        });

        await waitFor(() => result.current.isSuccess);

        expect(result.current.status).toBe('success');
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('http://localhost:3000/registrations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                admissionDate: "22/10/2023",
                email: "filipe@caju.com.br",
                employeeName: "Filipe Marins",
                status: "REVIEW",
                cpf: "78502270001"
            }),
        });
    });

    it('handles failure when adding a registration', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                status: 400,
                json: () => Promise.resolve({ error: 'Invalid data' }),
            })
        ) as jest.Mock;

        const { result, waitFor } = renderHook(() => useAddRegistration(), {
            wrapper: createWrapper(),
        });

        await act(async () => {
            result.current.mutate({
                admissionDate: "22/10/2023",
                email: "invalid-email",
                employeeName: "Filipe Marins",
                status: "REVIEW",
                cpf: "12345678900"
            });
        });

        await waitFor(() => result.current.isError);

        expect(result.current.status).toBe('error');
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('http://localhost:3000/registrations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                admissionDate: "22/10/2023",
                email: "invalid-email",
                employeeName: "Filipe Marins",
                status: "REVIEW",
                cpf: "12345678900"
            }),
        });
    });
});
