import { Registration } from "~/types/types";

export type RegistrationCardProps = {
    data: Registration;
};

export interface DialogData {
    title: string;
    message: string;
    status: string;
}