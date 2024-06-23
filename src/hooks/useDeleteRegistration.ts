// src/hooks/useDeleteRegistration.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteRegistration = async (id: number) => {
    const response = await fetch(`http://localhost:3000/registrations/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete registration');
    }

    return response.json();
};

const useDeleteRegistration = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteRegistration,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['registrations'] });
        },
    });
};

export default useDeleteRegistration;