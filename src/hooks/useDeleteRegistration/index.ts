import { useMutation, useQueryClient } from '@tanstack/react-query';

const API_URL = import.meta.env.VITE_JSON_DB_API_URL;

const deleteRegistration = async (id: number) => {
    const response = await fetch(`${API_URL}/registrations/${id}`, {
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