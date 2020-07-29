export enum ChangeUserRoleAction {
    PROMOTE = 'Promote',
    DOWNGRADE = 'Downgrade',
}

export interface UserRolePayload {
    id: number;
    role: string;
}
