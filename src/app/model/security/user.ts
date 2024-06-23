export interface User {
    id: string;
    name: string;
    password: string;
    active: boolean;
    fk_Employee: string;
    employeeName: string;
}