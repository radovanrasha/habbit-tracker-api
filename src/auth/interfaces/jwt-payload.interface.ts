export interface JwtPayload {
  username: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  sub?: string;
}
