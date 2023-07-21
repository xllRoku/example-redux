import { createContext, useContext } from "react";
import type {
	HandleEdit,
	HandleUpdate,
	IfNotUserToUpdated,
	SetStateUserToUpdate,
	StateUserToUpdate,
} from "./hooks/actions";
import { useUserActions } from "./hooks/actions";

interface UpdateUserInformationContextType {
	stateUserToUpdate: StateUserToUpdate;
	handleEdit: HandleEdit;
	handleUpdate: HandleUpdate;
	ifNotUserToUpdated: IfNotUserToUpdated;
	setStateUserToUpdate: SetStateUserToUpdate;
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
		ifNotUserToUpdated,
		setStateUserToUpdate,
	} = update();

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
};

const useUpdate = () => {
	const context = useContext(UpdateUserInformation);
	if (context === undefined) {
		throw new Error("useUpdate must be used within a AuthProvider");
	}
	return context;
};

export { UpdateUserInformationProvider, useUpdate };
