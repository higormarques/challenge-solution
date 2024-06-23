import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Registration } from '~/types/types';

const fetchRegistrations = async (cpf: string): Promise<Registration[]> => {
  const query = cpf?.length ? `?cpf=${cpf}` : '';

  const response = await fetch(`http://localhost:3000/registrations${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json() as Promise<Registration[]>;
};

const useFetchRegistrations = (cpf: string): UseQueryResult => {
  return useQuery({
    queryKey: ['registrations', cpf],
    queryFn: () => fetchRegistrations(cpf),
  });
};

export default useFetchRegistrations;