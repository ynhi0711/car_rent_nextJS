import User from 'src/feature/users/entities/user.entity';

export class AuthUserResponseDto {
  id: number;
  name: string;
  avatar_url: string;
  role: string;
  role_id: number;
  access_token: string;
  refresh_token: string;

  constructor(user: User, tokens) {
    (this.id = user.id),
      (this.name = user.name),
      (this.avatar_url = user.avatar_url),
      (this.role = user.role?.role),
      (this.role_id = user.role_id),
      (this.access_token = tokens.accessToken),
      (this.refresh_token = tokens.refreshToken);
  }
}
