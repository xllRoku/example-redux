import {
	Badge,
	Card,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
	TextInput,
	Title,
} from "@tremor/react";
import { Else, If, Then } from "../../functional.component";
import {
	HandleEdit,
	HandleUpdate,
	SetEditingUser,
	useUserActions,
} from "../hooks";
import { useAppSelector } from "../hooks/redux";
import { selectUserData } from "../store";
import { UserWithId } from "../store/slice";
import { FORM_NAMES } from "./CreateNewUser";

const UserInformation = ({ user }: { user: UserWithId }) => {
	console.log("user it's been passed down here", user);

	return (
		<>
			<TableCell
				style={{ display: "flex", alignItems: "center", gap: ".5rem" }}
			>
				<img
					style={{
						width: "32px",
						height: "32px",
						borderRadius: "100vh",
					}}
					src={`https://unavatar.io/github/${user.github}`}
					alt={user.name}
				/>
				<p>{user.name}</p>
			</TableCell>
			<TableCell>
				<p>{user.email}</p>
			</TableCell>
		</>
	);
};

const EditUser = ({
	setEditingUser,
	editingUser,
}: {
	setEditingUser: SetEditingUser;
	editingUser: UserWithId | undefined;
}) => {
	return (
		<>
			<TableCell
				style={{ display: "flex", alignItems: "center", gap: ".5rem" }}
			>
				<img
					style={{
						width: "32px",
						height: "32px",
						borderRadius: "100vh",
					}}
					src={`https://unavatar.io/github/${editingUser?.github}`}
					alt={editingUser?.name}
				/>
				<TextInput
					name={FORM_NAMES.NAME}
					value={editingUser?.name}
					onChange={(event) => {
						if (editingUser) {
							setEditingUser([{ ...editingUser, name: event.target.value }]);
						}
					}}
				/>
			</TableCell>
			<TableCell>
				<TextInput
					name={FORM_NAMES.EMAIL}
					value={editingUser?.email}
					onChange={(event) => {
						if (editingUser) {
							setEditingUser([{ ...editingUser, email: event.target.value }]);
						}
					}}
				/>
			</TableCell>
		</>
	);
};

export function ListOfUsers() {
	const users = useAppSelector(selectUserData);
	return (
		<Card>
			<Title>
				Usuarios
				<Badge>{users.length}</Badge>
			</Title>
			<Table>
				<TableHead>
					<TableRow>
						<TableHeaderCell>Id</TableHeaderCell>
						<TableHeaderCell>Nombre</TableHeaderCell>
						<TableHeaderCell>Email</TableHeaderCell>
						<TableHeaderCell>Acciones</TableHeaderCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{users.map((user) => (
						<TableRow key={user.id}>
							<User user={user} />
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Card>
	);
}

const User = ({
	user,
}: {
	user: UserWithId;
}) => {
	const { removeUser, update } = useUserActions();
	const { editingUser, handleEdit, handleUpdate, setEditingUser } = update();

	return (
		<>
			<TableCell>{user.id}</TableCell>

			{
				<If predicate={editingUser === undefined || editingUser.length === 0}>
					<Then predicate>
						<UserInformation user={user} />
					</Then>
					<Else predicate>
						{editingUser?.map((editedUser) =>
							editedUser.id === user.id ? (
								<EditUser
									editingUser={editedUser}
									setEditingUser={setEditingUser}
								/>
							) : (
								<UserInformation user={user} />
							),
						)}
					</Else>
				</If>
			}
			<TableCell>
				<div className="flex items-center gap-2">
					{
						<If
							predicate={editingUser === undefined || editingUser.length === 0}
						>
							<Then predicate>
								<EditButton handleEdit={handleEdit} user={user} />
							</Then>
							<Else predicate>
								{editingUser?.map((editedUser) =>
									editedUser.id === user.id ? (
										<SaveButton
											editUser={editedUser}
											handleUpdate={handleUpdate}
										/>
									) : (
										<EditButton handleEdit={handleEdit} user={user} />
									),
								)}
							</Else>
						</If>
					}

					<button type="button" onClick={() => removeUser(user.id)}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<title>Delete</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
							/>
						</svg>
					</button>
				</div>
			</TableCell>
		</>
	);
};

const EditButton = ({
	handleEdit,
	user,
}: {
	handleEdit: HandleEdit;
	user: UserWithId;
}) => {
	return (
		<button type="button" onClick={() => handleEdit(user)}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="w-6 h-6"
			>
				<title>Edit</title>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
				/>
			</svg>
		</button>
	);
};

const SaveButton = ({
	handleUpdate,
	editUser,
}: {
	handleUpdate: HandleUpdate;
	editUser: UserWithId | undefined;
}) => {
	return (
		<button type="button" onClick={() => handleUpdate(editUser)}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="w-6 h-6"
			>
				<title>Save</title>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
		</button>
	);
};
