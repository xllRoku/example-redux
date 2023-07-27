import { UpdateUserInformationProvider } from "../context/updateUserInformation";
import { useUserManagement } from "../hooks/management";
import { UserComponent } from "./UserComponent";

export function ListOfUsers() {
	const { getUsers } = useUserManagement();

	const users = getUsers();

	return (
		<div>
			<div className="flex items-center gap-2 mb-4">
				<h1 className="text-white text-xl">Usuarios</h1>
				<span className="w-8 h-6 inline-block bg-green-500 font-bold rounded-md text-white">
					{users?.length}
				</span>
			</div>
			<table className="w-full">
				<thead className=" border-b-2 bg-white">
					<tr>
						<td className="p-3 text-sm font-semibold tracking-wide  text-center">
							Id
						</td>
						<td className="p-3 text-sm font-semibold tracking-wide text-center">
							Nombre
						</td>
						<td className="p-3 text-sm font-semibold tracking-wide text-center">
							Email
						</td>
						<td className="p-3 text-sm font-semibold tracking-wide text-center">
							Acciones
						</td>
					</tr>
				</thead>
				<tbody>
					{users?.map((user) => (
						<tr key={user?.id} className="bg-gray-900 text-white">
							<UpdateUserInformationProvider>
								<UserComponent user={user} />
							</UpdateUserInformationProvider>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
