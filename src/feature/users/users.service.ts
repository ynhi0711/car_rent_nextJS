import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as constant from '../../common/constant';
import { Sequelize } from 'sequelize-typescript';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/feature/users/entities/user.entity';
import { APIException } from 'src/exception/api_exception';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from 'src/feature/users/entities/user_role.entity';
import { UserResponseDto } from './dto/user_response.dto';
import { PagingDto } from 'src/common/paging.dto';
import { off } from 'process';

@Injectable()
export class UsersService {
  constructor(
    @Inject(constant.USERS_REPOSITORY)
    private usersRepository: typeof User,

    @Inject(constant.SEQUELIZE)
    private sequelize: Sequelize,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = await User.create({
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
        refresh_token: createUserDto.refresh_token,
        avatar_url: createUserDto.avatar_url,
        role_id: createUserDto.role_id,
      });
      return createdUser;
    } catch (error) {
      APIException.throwException(HttpStatus.BAD_REQUEST, {
        message: 'Can not create new User',
      });
    }
  }

  async findAll(
    limit: number,
    offset: number,
  ): Promise<PagingDto<UserResponseDto>> {
    const data = await this.usersRepository.findAndCountAll({
      include: [UserRole],
      limit: Number(limit),
      offset: Number(offset),
    });
    return new PagingDto(
      data.rows.map((user) => new UserResponseDto(user)),
      data.count,
      Number(limit),
      Number(offset),
    );
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: id },
      include: [UserRole],
    });
    if (!user) {
      APIException.throwException(HttpStatus.NOT_FOUND, {
        message: 'This user does not exist',
      });
    }
    return user;
  }

  async findByidFromController(id: number) {
    const user = await this.findById(id);
    return new UserResponseDto(user);
  }

  async findByUsername(username: string): Promise<User> {
    const user = this.usersRepository.findOne({
      where: { name: username },
      include: [UserRole],
    });
    if (!user) {
      APIException.throwException(HttpStatus.NOT_FOUND, {
        message: 'This user does not exist',
      });
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id: id } });
    if (!user) {
      APIException.throwException(HttpStatus.NOT_FOUND, {
        message: 'This user does not exist',
      });
    }
    return this.usersRepository.update(updateUserDto, { where: { id: id } });
  }

  async remove(id: number): Promise<any> {
    return this.usersRepository.destroy({ where: { id: id } });
  }
}
