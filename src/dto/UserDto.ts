import * as joi from 'joi';

export const userSchema = joi.object({
    password: joi.string().required(),
    name: joi.string().required(),
});

export const registerUserSchema = joi.object({
    password: joi.string().required(),
    name: joi.string().required(),
    email: joi.string().required(),
});

export const adminUserSchema = joi.object({
    password: joi.string().required(),
    name: joi.string().required(),
})

export class UserDto {
    readonly name: string;
    readonly password: string;
}

export class RegisterUserDto {
    readonly name: string;
    readonly password: string;
    readonly email: string;
}

export class AdminUserDto {
    readonly name: string;
    readonly password: string;
}