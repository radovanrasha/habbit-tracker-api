export interface JwtPayload {
  username: string;
  email?: string;
  password?: string;
  sub?: string;
}
