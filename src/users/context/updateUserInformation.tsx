import { createContext, useContext } from "react";
import {
	useUpdateUser,
	useUserManagement,
	type HandleEdit,
	type HandleUpdate,
	type IfNotUserToUpdated,
	type SetStateUserToUpdate,
	type StateUserToUpdate,
} from "../hooks/actions";

interface UpdateUserInformationContext {
	stateUserToUpdate: StateUserToUpdate;
	handleEdit: HandleEdit;
	handleUpdate: HandleUpdate;
	ifNotUserToUpdated: IfNotUserToUpdated;
	setStateUserToUpdate: SetStateUserToUpdate;
}

const UpdateUserInformation = createContext<UpdateUserInformationContext>(
	{} as UpdateUserInformationContext,
);

function UpdateUserInformationProvider({
	children,
}: { children: React.ReactNode }) {
	const { update } = useUserManagement();
	const {
		handleEdit,
		handleUpdate,
		ifNotUserToUpdated,
		setStateUserToUpdate,
		stateUserToUpdate,
	} = useUpdateUser(update);

	const value = {
		stateUserToUpdate,
		handleEdit,
		handleUpdate,
		ifNotUserToUpdated,
		setStateUserToUpdate,
	};

	return (
		<UpdateUserInformation.Provider value={value}>
			{children}
		</UpdateUserInformation.Provider>
	);
}

const useUpdateUserInformation = () => {
	const context = useContext(UpdateUserInformation);
	if (context === undefined) {
		throw new Error("useUpdate must be used within a AuthProvider");
	}
	return context;
};

export { UpdateUserInformationProvider, useUpdateUserInformation };
