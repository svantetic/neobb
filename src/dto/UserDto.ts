import * as joi from 'joi';

export const userSchema = joi.object({
    email: joi.string().optional(),
    password: joi.string().required(),
    name: joi.string().required(),
});

export const adminUserSchema = joi.object({
    password: joi.string().required(),
    name: joi.string().required(),
})

export class UserDto {
    readonly name: string;
    readonly email: string;
    readonly password: string;
}

export class AdminUserDto {
    readonly email?: string;
    readonly name: string;
    readonly password: string;
}