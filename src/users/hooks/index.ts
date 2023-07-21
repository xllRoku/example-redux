import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { addUserSchema } from "../schemas";
import type { AddUserInfo } from "./actions";
import { useUserActions } from "./actions";

export const useAddUser = () => {
	const { addUser } = useUserActions();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<AddUserInfo>({
		resolver: zodResolver(addUserSchema),
	});

	const onSubmit: SubmitHandler<AddUserInfo> = (data) => {
		console.log(errors);
		console.log("IT WORKED", data);
		addUser(data);
		reset();
	};

	return { register, handleSubmit, onSubmit, errors };
};
