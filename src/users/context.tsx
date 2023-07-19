import { createContext, useContext } from "react";
import type {
	HandleEdit,
	HandleUpdate,
	IsNotUserToUpdated,
	SetStateUserToUpdate,
	StateUserToUpdate,
} from "./hooks/actions";
import { useUserActions } from "./hooks/actions";

interface UpdateUserInformationContextType {
	stateUserToUpdate: StateUserToUpdate;
	handleEdit: HandleEdit;
	handleUpdate: HandleUpdate;
	isNotUserToUpdated: IsNotUserToUpdated;
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
