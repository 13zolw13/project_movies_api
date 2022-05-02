import { number, object, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *   LoginInput:
 *     type: object
 *     required:
 *       - username
 *       - password
 *     properties:
 *        username:
 *            type: string
 *            default: premium-jim
 *        password:
 *            type: string
 *            default: GBLtTyq3E_UNjFnpo9m6
 */
export const LoginSchema = object({
	body: object({
		username: string({ required_error: "Username required" }).min(6),
		password: string({ required_error: "Password required" }).min(6),
	}),
});

export const LoginUserSchema = object({
	locals: object({
		user: object({
			userId: number({ required_error: "Data required" }),
			name: string({ required_error: "Data required" }),
			role: string({ required_error: "Data required" }),
			iat: number({ required_error: "Data required" }),
			exp: number({ required_error: "Data required" }),
			iss: string({ required_error: "Data required" }),
			sub: string({ required_error: "Data required" }),
		}),
	}),
});

export type LoginInput = TypeOf<typeof LoginSchema>["body"];
export type LoginUserInput = TypeOf<typeof LoginUserSchema>["locals"];
