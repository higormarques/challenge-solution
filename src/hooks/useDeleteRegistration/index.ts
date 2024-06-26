import { useMutation, useQueryClient } from '@tanstack/react-query';
import envConfig from '../../../env-config';

const API_URL = envConfig.apiUrl;

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