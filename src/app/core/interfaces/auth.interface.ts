export interface AuthDto {
  accessToken: string;
  role: UserRole;
}

export class AppUserAuth {
  id?: string;
  username?: string;
  email?: string;
  role?: UserRole = UserRole.USER;
  tmdb_key?: string;
  jwtToken?: string;
}

export enum UserRole {
  USER = 'USER',
  SUPERUSER = 'SUPERUSER',
  ADMIN = 'ADMIN',
}

export interface LoginDto {
  email: string;
  password: string;
}
