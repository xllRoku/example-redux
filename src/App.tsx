import { Toaster } from "sonner";
import "./App.css";
import { CreateNewUSer } from "./users/components/functional";
import { ListOfUsers } from "./users/components/interface";

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
