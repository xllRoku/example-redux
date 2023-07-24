import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MessageErrors } from "../constans";
import { CreateUserInfo, User, UserRepository, UserToUpdate } from "../models";
import { EMAIL_REGEX, addUserSchema } from "../schemas";
import { selectUserData } from "../store";
import {
	createNewUser,
	deleteUserById,
	updateUser,
} from "../store/redux.slice";
import { useAppDispatch, useAppSelector } from "./redux";

export const useUserManagement = (): UserRepository => {
	const dispatch = useAppDispatch();

	const getUsers = () => {
		const users = useAppSelector(selectUserData);
		return users;
	};

	const create = (user: CreateUserInfo) => {
		dispatch(
			createNewUser({
				name: user.name,
				email: user.email,
				github: user.github,
			}),
		);
	};

	const update = (userToUpdate: UserToUpdate) => {
		dispatch(
			updateUser({
				...userToUpdate,
				name: userToUpdate?.name,
				email: userToUpdate?.email,
			}),
		);
	};

	const remove = (id: string) => {
		dispatch(deleteUserById(id));
	};

	return { create, update, remove, getUsers };
};

export const useUpdateUser = (update: UserRepository["update"]) => {
	const state = {
		users: undefined,
		errors: {
			email: {
				message: "",
			},
			name: {
				message: "",
			},
		},
	};

	const [stateUserToUpdate, setStateUserToUpdate] = useState<{
		users: User[] | undefined;
		errors: {
			name: { message: string | null };
			email: { message: string | null };
		};
	}>(state);

	const handleEdit = useCallback(
		(userToUpdate: User) => {
			setStateUserToUpdate((prevState) => ({
				...prevState,
				users: [...(prevState.users || []), userToUpdate],
			}));
		},
		[setStateUserToUpdate],
	);

	const validateUser = (userToUpdate: User) => {
		const currentUser = stateUserToUpdate.users?.find(
			(currentState) => currentState.id === userToUpdate.id,
		);

		if (!currentUser) {
			return { name: { message: "" }, email: { message: "" } };
		}

		const errors = {
			name: { message: "" },
			email: { message: "" },
		};

		const IsNotTheSameNameValue = !(currentUser.name !== userToUpdate.name);
		const IsNotThemSameEmailValue = !(currentUser.email !== userToUpdate.email);

		if (IsNotTheSameNameValue && userToUpdate.name.length < 3) {
			errors.name.message = MessageErrors.name;
		}

		if (IsNotThemSameEmailValue && !EMAIL_REGEX.test(userToUpdate.email)) {
			errors.email.message = MessageErrors.email;
		}

		return errors;
	};

	const resetErrors = () => {
		setStateUserToUpdate((prevState) => ({
			users: prevState.users,
			errors: {
				email: { message: "" },
				name: { message: "" },
			},
		}));
	};

	const setErrors = (errors: {
		name: {
			message: string;
		};
		email: {
			message: string;
		};
	}) => {
		setStateUserToUpdate((prevState) => ({
			...prevState,
			errors: {
				...prevState.errors,
				name: { message: errors.name.message },
				email: { message: errors.email.message },
			},
		}));
	};

	const takeOutFromStateUser = (userToUpdate: User) =>
		stateUserToUpdate?.users?.filter((user) => user.id !== userToUpdate?.id);

	const takeOutUser = (userToUpdate: User) => {
		setStateUserToUpdate((prevState) => ({
			...prevState,
			users: takeOutFromStateUser(userToUpdate),
		}));
	};

	const handleUpdate = useCallback(
		(userToUpdate: UserToUpdate) => {
			if (userToUpdate) {
				resetErrors();
				const errors = validateUser(userToUpdate);

				if (errors.name.message || errors.email.message) {
					setErrors(errors);
				} else {
					update({
						...userToUpdate,
						name: userToUpdate?.name,
						email: userToUpdate?.email,
					});
					takeOutUser(userToUpdate);
				}
			}
		},
		[stateUserToUpdate, setStateUserToUpdate],
	);

	const ifNotUserToUpdated =
		stateUserToUpdate.users === undefined ||
		stateUserToUpdate.users?.length === 0;

	return {
		stateUserToUpdate,
		handleEdit,
		handleUpdate,
		setStateUserToUpdate,
		ifNotUserToUpdated,
	};
};

export const useCreateUser = (create: UserRepository["create"]) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<CreateUserInfo>({
		resolver: zodResolver(addUserSchema),
	});

	const onSubmit: SubmitHandler<CreateUserInfo> = (data) => {
		create(data);
		reset();
	};

	return { register, handleSubmit, onSubmit, errors };
};

type UpdateActions = ReturnType<typeof useUpdateUser>;
export type StateUserToUpdate = UpdateActions["stateUserToUpdate"];
export type SetStateUserToUpdate = UpdateActions["setStateUserToUpdate"];
export type IfNotUserToUpdated = UpdateActions["ifNotUserToUpdated"];
export type HandleEdit = UpdateActions["handleEdit"];
export type HandleUpdate = UpdateActions["handleUpdate"];
