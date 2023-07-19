import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { AddUserInfo } from "./actions";
import { useUserActions } from "./actions";

export const useAddUser = () => {
	const { addUser } = useUserActions();
	const { handleSubmit, control, reset } = useForm<AddUserInfo>();

	const onSubmit: SubmitHandler<AddUserInfo> = (data) => addUser(data);

	return { handleSubmit, control, reset, onSubmit };
};

export type ControlInfer = ReturnType<typeof useAddUser>["control"];
