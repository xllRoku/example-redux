import { Middleware } from "@reduxjs/toolkit";
import { RootState, store } from ".";
import { errorMessage, succesMessage } from "../../toast";
import { client } from "../client";
import { User } from "../models";
import { rollbackUser } from "./redux.slice";

export const persistanceLocalStorageMiddleware: Middleware =
	(store) => (next) => (action) => {
		next(action);
		localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
	};

const handleAddNewUser = (userToAdd: User) => {
	client("users", "POST", userToAdd)
		.then((res) => {
			if (res) {
				succesMessage(`Usuario ${res.name} creado correctamente`);
			}
		})
		.catch((err) => {
			console.log(err);
			console.log("error");
		});
};

const handleDeleteUserById = (
	userIdToRemove: UserIdToRemove,
	previousState: RootState,
) => {
	const userToRemove = previousState.users.find(
		(user: User) => user.id === userIdToRemove,
	) as User;

	client(`users/${userIdToRemove}`, "DELETE")
		.then((res) => {
			if (res) {
				succesMessage(`Usuario ${userIdToRemove} borrado correctamente`);
			}
		})
		.catch((err) => {
			errorMessage(`Error deleting user ${userIdToRemove}`);
			if (userToRemove) store.dispatch(rollbackUser(userToRemove));
			console.log(err);
			console.log("error");
		});
};

export const syncWithDatabaseMiddleware: Middleware =
	(store) => (next) => (action) => {
		const previousState = store.getState();

		next(action);

		switch (action.type) {
			case "users/addNewUser":
				handleAddNewUser(action.payload as User);
				break;
			case "users/deleteUserById":
				handleDeleteUserById(action.payload as string, previousState);
				break;
			default:
				break;
		}
	};

type UserIdToRemove = string;
