import { ForbiddenException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { APIException } from 'src/exeption/api_exception';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';

import * as argon2 from 'argon2';
import { AuthDto } from 'src/users/dto/auth.dto';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async signUp(createUserDto: CreateUserDto): Promise<AuthUserResponseInteface> {
        // Check if user exists
        const userExists = await this.usersService.findByUsername(
            createUserDto.name,
        );
        if (userExists) {
            throw APIException.throwException(HttpStatus.BAD_REQUEST, { message: 'User already exists' })
        }

        // Hash password
        const hash = await this.hashData(createUserDto.password);
        const createdUser = await this.usersService.create({
            ...createUserDto,
            password: hash,
        });
        const user = await this.usersService.findById(createdUser.id)
        const tokens = await this.getTokens(user.id, user.name, user.role?.role);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return {
            id: user.id,
            name: user.name,
            avatar_url: user.avatar_url,
            role: user.role?.role,
            role_id: user.role_id,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
        };
    }

    async signIn(data: AuthDto): Promise<AuthUserResponseInteface> {
        // Check if user exists
        const userExists = await this.usersService.findByUsername(data.username);
        if (!userExists) {
            throw APIException.throwException(HttpStatus.BAD_REQUEST, { message: 'User doesn\'t exists' })
        }
        const passwordMatches = await argon2.verify(userExists.password, data.password);
        if (!passwordMatches)
            throw new APIException.throwException(HttpStatus.BAD_REQUEST, { message: 'Password is incorrect' });

        const tokens = await this.getTokens(userExists.id, userExists.name, userExists.role.role);
        await this.updateRefreshToken(userExists.id, tokens.refreshToken);
        return {
            id: userExists.id,
            name: userExists.name,
            avatar_url: userExists.avatar_url,
            role: userExists.role.role,
            role_id: userExists.role_id,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
        };
    }
    hashData(data: string) {
        return argon2.hash(data);
    }
    async getTokens(userId: number, username: string, role: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    username,
                    role
                },
                {
                    secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
                    expiresIn: '15m',
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                    username,
                    role
                },
                {
                    secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                    expiresIn: '7d',
                },
            ),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }
    async logout(userId: number) {
        return this.usersService.update(userId, { refresh_token: null });
    }

    async updateRefreshToken(userId: number, refreshToken: string) {
        const hashedRefreshToken = await this.hashData(refreshToken);
        await this.usersService.update(userId, {
            refresh_token: hashedRefreshToken,
        });
    }
    async refreshTokens(userId: number, refreshToken: string) {
        const user = await this.usersService.findById(userId);
        if (!user || !user.refresh_token)
            throw new ForbiddenException('Access Denied');
        const refreshTokenMatches = await argon2.verify(
            user.refresh_token,
            refreshToken,
        );
        if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
        const tokens = await this.getTokens(user.id, user.name, user.role.role);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }
}