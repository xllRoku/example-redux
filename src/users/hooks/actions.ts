import { useState } from "react";
import type { UserId, UserWithId } from "../store/slice";
import { addNewUser, deleteUserById, updateUser } from "../store/slice";
import { useAppDispatch } from "./redux";

export const useUserActions = () => {
	const dispatch = useAppDispatch();

	const addUser = (user: AddUserInfo) => {
		dispatch(
			addNewUser({ name: user.name, email: user.email, github: user.github }),
		);
	};

	const update = () => {
		const [stateUserToUpdate, setStateUserToUpdate] = useState<
			UserWithId[] | undefined
		>(undefined);

		const handleEdit = (userToUpdate: UserWithId) => {
			setStateUserToUpdate([userToUpdate]);
		};

		const handleUpdate = (userToUpdate: UserToUpdate) => {
			dispatch(updateUser(userToUpdate));
			setStateUserToUpdate(
				stateUserToUpdate?.filter((user) => user.id !== userToUpdate?.id),
			);
		};

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

	const removeUser = (id: UserId) => {
		dispatch(deleteUserById(id));
	};

	return { addUser, removeUser, update };
};

export type AddUserInfo = Omit<UserWithId, "id">;
type UpdateActions = ReturnType<ReturnType<typeof useUserActions>["update"]>;
export type UserToUpdate = UserWithId | undefined;
export type StateUserToUpdate = UpdateActions["stateUserToUpdate"];
export type SetStateUserToUpdate = UpdateActions["setStateUserToUpdate"];
export type IfNotUserToUpdated = UpdateActions["ifNotUserToUpdated"];
export type HandleEdit = UpdateActions["handleEdit"];
export type HandleUpdate = UpdateActions["handleUpdate"];
