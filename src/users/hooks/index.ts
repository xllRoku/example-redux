import { useState } from "react";
import { FORM_NAMES } from "../components/CreateNewUser";
import { User, UserId, addNewUser, deleteUserById } from "../store/slice";
import { useAppDispatch } from "./redux";

export const useUserActions = () => {
	const dispatch = useAppDispatch();

	const addUser = (user: Omit<User, "id">) => {
		dispatch(
			addNewUser({ name: user.name, email: user.email, github: user.github }),
		);
	};

	const removeUser = (id: UserId) => {
		dispatch(deleteUserById(id));
	};

	return { addUser, removeUser };
};

export const useAddUser = () => {
	const { addUser } = useUserActions();
	const [result, setResult] = useState<"ok" | "ko" | null>(null);

	const getValue = (formData: FormData, inputName: string) =>
		formData.get(inputName) as string;

	const getUserFormData = (formData: FormData) => ({
		name: getValue(formData, FORM_NAMES.NAME),
		email: getValue(formData, FORM_NAMES.EMAIL),
		github: getValue(formData, FORM_NAMES.GITHUB),
	});

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const form = event.currentTarget;
		const formData = new FormData(form);
		const user = getUserFormData(formData);

		if (!user.name || !user.email || !user.github) {
			return setResult("ko");
		}

		addUser(user);
		setResult("ok");
		form.reset();
	};

	return { handleSubmit, result };
};
