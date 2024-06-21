import { useQuery, UseQueryResult } from '@tanstack/react-query';

interface Registration {
  id: number;
  admissionDate: string;
  email: string;
  employeeName: string;
  status: string;
  cpf: string;
}

const fetchRegistrations = async (cpf?: string | undefined): Promise<Registration[]> => {
  const query = cpf?.length ? `?cpf=${cpf}` : '';

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
    queryKey: ['registrations'],
    queryFn: () => fetchRegistrations(cpf),
  });
};
