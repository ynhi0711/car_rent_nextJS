import { IsEmail, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
    name: string

    password: string

    email: string

    avatar_url: string

    role_id: number

    refresh_token?: string

}