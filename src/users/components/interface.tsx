import {
	Badge,
	Card,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
	Title,
} from "@tremor/react";
import { ConditionalRender } from "../../functional.component";
import { profilePictureUrl } from "../constans";
import { UpdateUserInformationProvider, useUpdate } from "../context";
import { useGetState } from "../hooks";
import { UserToUpdate } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";
import { selectUserData } from "../store";
import { UserWithId } from "../store/slice";
import { DeleteButton, EditButton, EditUser, SaveButton } from "./functional";

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

function UserComponent({ user }: { user: UserWithId }) {
	const { stateUserToUpdate, ifNotUserToUpdated } = useUpdate();
	const { buttonState: isButton, user: userToUpdate } = useGetState(
		stateUserToUpdate,
		user,
	);

	return (
		<>
			<TableCell>{user.id}</TableCell>

			<ConditionalRender predicate={ifNotUserToUpdated}>
				<UserInformation user={user} />
			</ConditionalRender>

			<ConditionalRender predicate={!ifNotUserToUpdated}>
				<EditUser userToUpdate={userToUpdate} />
			</ConditionalRender>

			<TableCell>
				<div className="flex items-center gap-2">
					<ConditionalRender predicate={ifNotUserToUpdated}>
						<EditButton user={user} />
					</ConditionalRender>

					<ConditionalRender predicate={!ifNotUserToUpdated}>
						<ConditionalRender predicate={isButton.save}>
							<SaveButton userToUpdate={userToUpdate} />
						</ConditionalRender>

						<ConditionalRender predicate={isButton.edit}>
							<EditButton user={user} />
						</ConditionalRender>
					</ConditionalRender>

					<DeleteButton user={user} />
				</div>
			</TableCell>
		</>
	);
}

function UserInformation({ user }: { user: UserWithId }) {
	return (
		<>
			<TableCell className="flex items-center gap-[.5rem]">
				<ProfileImage user={user} />
				<p>{user.name}</p>
			</TableCell>
			<TableCell>
				<p>{user.email}</p>
			</TableCell>
		</>
	);
}

export function ProfileImage({ user }: { user: UserWithId | UserToUpdate }) {
	return (
		<img
			className="w-[32px] h-[32px] rounded-full"
			src={`${profilePictureUrl}/${user?.github}`}
			alt={user?.name}
		/>
	);
}
