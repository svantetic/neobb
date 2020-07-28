import { ChangeUserRoleAction } from './interfaces';

export const UserRoleMixin = {
    computed: {
        roleAction(): ChangeUserRoleAction {
            return this.user.role === 'USER'
                ? ChangeUserRoleAction.PROMOTE
                : ChangeUserRoleAction.DOWNGRADE;
        },
    },
};
