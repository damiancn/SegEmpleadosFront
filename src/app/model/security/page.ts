export interface Page {
    id: string;
    name: string;
    icon: string;
    code: string;
    fk_Menu: string;
    menuName: string;
    active: boolean;
}