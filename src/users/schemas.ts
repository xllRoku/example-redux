import { z } from "zod";
import { MessageErrors } from "./constans";

export const EMAIL_REGEX =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const addUserSchema = z.object({
	name: z.string().min(3, { message: MessageErrors.name }),
	email: z.string().regex(EMAIL_REGEX, { message: MessageErrors.email }),
	github: z.string({}).min(3, { message: MessageErrors.github }),
});
