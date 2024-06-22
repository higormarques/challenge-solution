import { useQuery, UseQueryResult } from '@tanstack/react-query';

export interface Registration {
  id: number;
  admissionDate: string;
  email: string;
  employeeName: string;
  status: string;
  cpf: string;
}

const fetchRegistrations = async (urlQuery: string): Promise<Registration[]> => {
  const query = urlQuery?.length ? `?cpf=${urlQuery}` : '';

  const response = await fetch(`http://localhost:3000/registrations${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json() as Promise<Registration[]>;
};

export const useFetchRegistrations = (cpf: string): UseQueryResult => {
  return useQuery({
    queryKey: ['registrations', cpf],
    queryFn: () => fetchRegistrations(cpf),
  });
};
