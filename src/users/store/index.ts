import { configureStore, type Middleware } from "@reduxjs/toolkit";
import { client } from "../../client";
import { errorMessage, succesMessage } from "../../toast";
import usersReducer, { UserWithId, rollbackUser } from "./slice";

const persistanceLocalStorageMiddleware: Middleware =
	(store) => (next) => (action) => {
		console.log(store.getState());
		console.log(action);
		next(action);
		localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
		console.log(store.getState());
	};

const handleAddNewUser = (userToAdd: UserWithId) => {
	client("users", "POST", userToAdd)
		.then((res) => {
			console.log("new user", res);
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
	userIdToRemove: string,
	previousState: RootState,
) => {
	const userToRemove = previousState.users.find(
		(user: UserWithId) => user.id === userIdToRemove,
	) as UserWithId;

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

const syncWithDatabaseMiddleware: Middleware =
	(store) => (next) => (action) => {
		const previousState = store.getState();

		next(action);

		switch (action.type) {
			case "users/addNewUser":
				handleAddNewUser(action.payload as UserWithId);
				break;
			case "users/deleteUserById":
				handleDeleteUserById(action.payload as string, previousState);
				break;
			default:
				break;
		}
	};

export const store = configureStore({
	reducer: {
		users: usersReducer,
	},
	middleware: [persistanceLocalStorageMiddleware, syncWithDatabaseMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const selectUserData = (state: RootState) => state.users;
