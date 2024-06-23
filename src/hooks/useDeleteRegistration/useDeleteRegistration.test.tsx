import { renderHook, act } from '@testing-library/react-hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useDeleteRegistration from './index';

jest.mock('@tanstack/react-query', () => ({
    useQueryClient: jest.fn(),
    useMutation: jest.fn(),
}));

global.fetch = jest.fn();

describe('useDeleteRegistration', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('calls invalidateQueries on successful deletion', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValue({}),
        });

        const invalidateQueriesMock = jest.fn();
        (useQueryClient as jest.Mock).mockImplementation(() => ({
            invalidateQueries: invalidateQueriesMock,
        }));

        let mutationFn: (arg0: number) => any;
        (useMutation as jest.Mock).mockImplementation((options) => {
            mutationFn = options.mutationFn;
            return { mutate: options.onSuccess };
        });

        const { result } = renderHook(() => useDeleteRegistration());

        await act(async () => {
            await mutationFn(1);
            result.current.mutate(1);
        });

        expect(invalidateQueriesMock).toHaveBeenCalledWith({ queryKey: ['registrations'] });
    });

    it('handles error on deletion failure', async () => {
        // Mock para fetch com erro
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
        });

        const { result } = renderHook(() => useDeleteRegistration());

        await act(async () => {
            try {
                await result.current.mutate(1);
            } catch (error) {
                expect(error).toEqual(new Error('Failed to delete registration'));
            }
        });
    });
});