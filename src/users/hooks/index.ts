import { useState } from "react";
import { FORM_NAMES } from "../components/CreateNewUser";
import {
	User,
	UserId,
	UserWithId,
	addNewUser,
	deleteUserById,
	updateUser,
} from "../store/slice";
import { useAppDispatch } from "./redux";

export const useUserActions = () => {
	const dispatch = useAppDispatch();

	const addUser = (user: Omit<User, "id">) => {
		dispatch(
			addNewUser({ name: user.name, email: user.email, github: user.github }),
		);
	};

	const update = () => {
		const [editingUser, setEditingUser] = useState<UserWithId[] | undefined>(
			undefined,
		);

		const handleEdit = (userToUpdate: UserWithId) => {
			setEditingUser([userToUpdate]);
		};

		const handleUpdate = (userToUpdate: UserWithId | undefined) => {
			dispatch(updateUser(userToUpdate));
			console.log(editingUser?.filter((user) => user.id !== userToUpdate?.id));
			setEditingUser(
				editingUser?.filter((user) => user.id !== userToUpdate?.id),
			);
		};

		return {
			editingUser,
			handleEdit,
			handleUpdate,
			setEditingUser,
		};
	};

	const removeUser = (id: UserId) => {
		dispatch(deleteUserById(id));
	};

	return { addUser, removeUser, update };
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

export type SetEditingUser = React.Dispatch<
	React.SetStateAction<UserWithId[] | undefined>
>;
export type HandleEdit = (userToUpdate: UserWithId) => void;
export type HandleUpdate = (userToUpdate: UserWithId | undefined) => void;
