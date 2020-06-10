import * as joi from 'joi';

export const userSchema = joi.object({
    password: joi.string().required(),
    username: joi.string().required(),
});

export const registerUserSchema = joi.object({
    password: joi.string().required(),
    username: joi.string().required(),
    email: joi.string().required(),
});

export const adminUserSchema = joi.object({
    password: joi.string().required(),
    username: joi.string().required(),
})

export class UserDto {
    readonly username: string;
    readonly password: string;
}

export class RegisterUserDto {
    readonly username: string;
    readonly password: string;
    readonly email: string;
}

export class AdminUserDto {
    readonly username: string;
    readonly password: string;
}