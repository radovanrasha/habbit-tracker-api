export interface JwtPayload {
  username: string;
  password?: string;
  sub: number;
}
