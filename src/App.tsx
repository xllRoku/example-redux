import { Toaster } from "sonner";
import "./App.css";
import { CreateNewUSer, ListOfUsers } from "./users/components";

function App() {
	return (
		<>
			<ListOfUsers />
			<CreateNewUSer />
			<Toaster richColors />
		</>
	);
}

export default App;
