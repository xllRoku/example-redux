import { ZodType, z } from "zod";
import { AddUserInfo } from "./hooks/actions";

const EMAIL_REGEX =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const addUserSchema: ZodType<AddUserInfo> = z.object({
	name: z.string().min(3, { message: "Name message error" }),
	email: z.string().regex(EMAIL_REGEX, { message: "Email message error" }),
	github: z.string({}).min(3, { message: "Github message error" }),
});