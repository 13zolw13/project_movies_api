

export interface UserJWT {
	userId: number;
	name: string;
	role: string;
	iat: number;
	exp: number;
	iss: string;
	sub: string;

}
