import User from 'src/feature/users/entities/user.entity';

export class UserResponseDto {
  id: number;
  name: string;
  email: string;
  role_id: number;
  role: string;
  avatar_url: string;
  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.role_id = user.role_id;
    this.role = user.role.role;
    this.avatar_url = user.avatar_url;
  }
}
