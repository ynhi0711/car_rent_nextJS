import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Public()
  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map(user => {
      return {
        id: user.id,
        name: user.name,
        avatar_url: user.avatar_url,
        role: user.role?.role,
        role_id: user.role_id,
        created_at: user.createdAt,
        updated_at: user.updatedAt
      }
    })
  }

  @Public()
  @Get(':id')
  findById(@Param('id') id: number) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
