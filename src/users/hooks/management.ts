import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateUserInfo, User, UserRepository, UserToUpdate } from "../models";
import { addUserSchema } from "../schemas";
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
	const [stateUserToUpdate, setStateUserToUpdate] = useState<
		User[] | undefined
	>(undefined);

	const handleEdit = useCallback(
		(userToUpdate: User) => {
			setStateUserToUpdate([userToUpdate]);
		},
		[setStateUserToUpdate],
	);

	const handleUpdate = useCallback(
		(userToUpdate: UserToUpdate) => {
			if (userToUpdate) {
				update({
					...userToUpdate,
					name: userToUpdate?.name,
					email: userToUpdate?.email,
				});
			}
			setStateUserToUpdate(
				stateUserToUpdate?.filter((user) => user.id !== userToUpdate?.id),
			);
		},
		[stateUserToUpdate, setStateUserToUpdate],
	);

	const ifNotUserToUpdated =
		stateUserToUpdate === undefined || stateUserToUpdate.length === 0;

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
