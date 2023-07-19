import { createContext, useContext } from "react";
import {
	HandleEdit,
	HandleUpdate,
	SetEditingUser,
	useUserActions,
} from "./hooks";
import { UserWithId } from "./store/slice";

interface UpdateUserInformationContextType {
	stateUserToUpdate: UserWithId[] | undefined;
	handleEdit: HandleEdit;
	handleUpdate: HandleUpdate;
	isNotUserToUpdated: boolean;
	setStateUserToUpdate: SetEditingUser;
}

const UpdateUserInformation = createContext<UpdateUserInformationContextType>(
	{} as UpdateUserInformationContextType,
);

const UpdateUserInformationProvider = ({
	children,
}: { children: React.ReactNode }) => {
	const { update } = useUserActions();

	const {
		stateUserToUpdate,
		handleEdit,
		handleUpdate,
		isNotUserToUpdated,
		setStateUserToUpdate,
	} = update();

	const value = {
		stateUserToUpdate,
		handleEdit,
		handleUpdate,
		isNotUserToUpdated,
		setStateUserToUpdate,
	};

	return (
		<UpdateUserInformation.Provider value={value}>
			{children}
		</UpdateUserInformation.Provider>
	);
};

const useUpdate = () => {
	const context = useContext(UpdateUserInformation);
	if (context === undefined) {
		throw new Error("useUpdate must be used within a AuthProvider");
	}
	return context;
};

export { UpdateUserInformationProvider, useUpdate };
