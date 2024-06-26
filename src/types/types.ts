export interface RegistrationFormPayload {
    admissionDate: string;
    email: string;
    employeeName: string;
    status: string;
    cpf: string;
}

export interface Registration extends RegistrationFormPayload {
    id: number;
}