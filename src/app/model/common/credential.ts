import { Page } from "../security/page";

export interface Credential {
    userId: string;
    userName: string;
    token: string;
    rolId: string;
    rol: string;
    pages: Page[];
}