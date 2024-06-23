// src/hooks/useUpdateStatus.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Registration } from '~/types/types';



const updateStatus = async (registration: Registration): Promise<unknown> => {
    const { id } = registration;
    const response = await fetch(`http://localhost:3000/registrations/${id}`, {
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

const useUpdateStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['registrations'] });
        },
    });
};

export default useUpdateStatus;

