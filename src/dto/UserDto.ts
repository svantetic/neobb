import * as joi from 'joi';

export const userSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
    name: joi.string().required(),
});

export class UserDto {
    readonly name: string;
    readonly email: string;
    readonly password: string;
}
