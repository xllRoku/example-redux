import { Toaster } from "sonner";
import "./App.css";
import { CreateNewUSer } from "./users/components/CreateNewUSer";
import { ListOfUsers } from "./users/components/ListOfUsers";
import { useUserManagement } from "./users/hooks/management";

export default App;
function App() {
	const { create, getUsers } = useUserManagement();

	return (
		<>
			<ListOfUsers getUsers={getUsers} />
			<CreateNewUSer create={create} />
			<Toaster richColors />
		</>
	);
}
