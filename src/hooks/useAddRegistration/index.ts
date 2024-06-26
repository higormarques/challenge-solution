import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RegistrationFormPayload } from '~/types/types';

const API_URL = import.meta.env.VITE_JSON_DB_API_URL;

const addRegistration = async (registration: RegistrationFormPayload) => {
    const response = await fetch(`${API_URL}/registrations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registration),
    });

    if (!response.ok) {
        throw new Error('Failed to add registration');
    }

    return response.json();
};

const useAddRegistration = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addRegistration,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['registrations'] });
        }

    });
};

export default useAddRegistration;