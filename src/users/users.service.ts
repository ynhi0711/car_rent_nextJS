import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as constant from '../common/constant';
import { Sequelize } from 'sequelize-typescript';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'database/models/user';
import { APIException } from 'src/exeption/api_exception';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from 'database/models/user_role';

@Injectable()
export class UsersService {

    constructor(
        @Inject(constant.USERS_REPOSITORY)
        private usersRepository: typeof User,

        @Inject(constant.SEQUELIZE)
        private sequelize: Sequelize,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        try {
            const createdUser = await User.create({ name: createUserDto.name, email: createUserDto.email, password: createUserDto.password, refresh_token: createUserDto.refresh_token, avatar_url: createUserDto.avatar_url, role_id: createUserDto.role_id })
            return createdUser;
        } catch (error) {
            APIException.throwException(HttpStatus.BAD_REQUEST, { message: 'Can not create new User' })
        }
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.findAll({ include: [UserRole] });
    }

    async findById(id: number): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { id: id }, include: [UserRole] })
        if (!user) {
            APIException.throwException(HttpStatus.NOT_FOUND, { message: 'This user does not exist' })
        }
        return user
    }

    async findByUsername(username: string): Promise<User> {
        const user = this.usersRepository.findOne({ where: { name: username }, include: [UserRole] })
        if (!user) {
            APIException.throwException(HttpStatus.NOT_FOUND, { message: 'This user does not exist' })
        }
        return user
    }

    async update(
        id: number,
        updateUserDto: UpdateUserDto,
    ) {
        const user = await this.usersRepository.findOne({ where: { id: id } })
        if (!user) {
            APIException.throwException(HttpStatus.NOT_FOUND, { message: 'This user does not exist' })
        }
        return this.usersRepository.update(updateUserDto, { where: { id: id } })
    }

    async remove(id: number): Promise<any> {
        return this.usersRepository.destroy({ where: { id: id } })
    }
}