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
import { ConditionalRender } from "../../functional.component";
import { FORM_NAMES, profilePictureUrl } from "../constans";
import {
	UpdateUserInformationProvider,
	useUpdateUserInformation,
} from "../context/updateUserInformation";
import { useGetUserToUpdate, useUpdateProperty } from "../hooks";
import { useUserManagement } from "../hooks/actions";
import { DeleteButton, EditButton, SaveButton } from "./functional";
import {
	ProfileImageProp,
	UserPropChildComponent,
	UserPropComponent,
} from "./types";

export function ListOfUsers() {
	const { getUsers } = useUserManagement();

	const users = getUsers();

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
							<UpdateUserInformationProvider>
								<UserComponent user={user} />
							</UpdateUserInformationProvider>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Card>
	);
}

function UserComponent({ user }: UserPropComponent) {
	const { stateUserToUpdate, ifNotUserToUpdated } = useUpdateUserInformation();
	const { buttonState: isButton, user: userToUpdate } = useGetUserToUpdate(
		stateUserToUpdate,
		user,
	);

	return (
		<>
			<TableCell>{user.id}</TableCell>
			<ConditionalRender predicate={ifNotUserToUpdated}>
				<UserInformation
					user={user}
					userToUpdate={userToUpdate}
					isButton={isButton}
				/>
			</ConditionalRender>

			<ConditionalRender predicate={!ifNotUserToUpdated}>
				<EditUser user={user} userToUpdate={userToUpdate} isButton={isButton} />
			</ConditionalRender>
		</>
	);
}

function UserInformation({
	user,
	userToUpdate,
	isButton,
}: UserPropChildComponent) {
	return (
		<>
			<TableCell className="flex items-center gap-[.5rem]">
				<ProfileImage user={user} />
				<p>{user.name}</p>
			</TableCell>
			<TableCell>
				<p>{user.email}</p>
			</TableCell>
			<Actions user={user} userToUpdate={userToUpdate} isButton={isButton} />
		</>
	);
}

export function EditUser({
	user,
	userToUpdate,
	isButton,
}: UserPropChildComponent) {
	const { updateProperty } = useUpdateProperty();

	return (
		<>
			<TableCell className="flex items-center gap-[.5rem]">
				<ProfileImage user={user} />
				<TextInput
					name={FORM_NAMES.NAME}
					value={userToUpdate?.name}
					onChange={(event) => updateProperty(event, userToUpdate, "name")}
				/>
			</TableCell>
			<TableCell>
				<TextInput
					name={FORM_NAMES.EMAIL}
					value={userToUpdate?.email}
					onChange={(event) => updateProperty(event, userToUpdate, "email")}
				/>
			</TableCell>
			<Actions user={user} userToUpdate={userToUpdate} isButton={isButton} />
		</>
	);
}

function Actions({ user, userToUpdate, isButton }: UserPropChildComponent) {
	return (
		<TableCell>
			<div className="flex items-center gap-2">
				<ConditionalRender predicate={isButton.save}>
					<SaveButton userToUpdate={userToUpdate} />
				</ConditionalRender>

				<ConditionalRender predicate={isButton.edit}>
					<EditButton user={user} />
				</ConditionalRender>
				<DeleteButton user={user} />
			</div>
		</TableCell>
	);
}

export function ProfileImage({ user }: ProfileImageProp) {
	return (
		<img
			className="w-[32px] h-[32px] rounded-full"
			src={`${profilePictureUrl}/${user?.github}`}
			alt={user?.name}
		/>
	);
}
