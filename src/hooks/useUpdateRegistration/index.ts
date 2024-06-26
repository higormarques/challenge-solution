import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Registration } from '~/types/types';
import envConfig from '../../../env-config';

const API_URL = envConfig.apiUrl;

const updateRegistration = async (registration: Registration): Promise<unknown> => {
    const { id } = registration;
    const response = await fetch(`${API_URL}/registrations/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registration),
    });

    if (!response.ok) {
        throw new Error('Failed to update status');
    }

    return response.json();
};

const useUpdateRegistration = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateRegistration,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['registrations'] });
        },
    });
};

export default useUpdateRegistration;

