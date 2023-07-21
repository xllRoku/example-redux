import { Button, Card, TableCell, TextInput, Title } from "@tremor/react";
import { FORM_NAMES } from "../constans";
import { useUpdate } from "../context";
import { useAddUser } from "../hooks";
import { UserToUpdate, useUserActions } from "../hooks/actions";
import { UserWithId } from "../store/slice";
import { ProfileImage } from "./interface";

export function SaveButton({
	userToUpdate,
}: {
	userToUpdate: UserToUpdate;
}) {
	const { handleUpdate } = useUpdate();

	return (
		<button type="button" onClick={() => handleUpdate(userToUpdate)}>
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
}

export function EditButton({
	user,
}: {
	user: UserWithId;
}) {
	const { handleEdit } = useUpdate();

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
}

export function DeleteButton({ user }: { user: UserWithId }) {
	const { removeUser } = useUserActions();
	return (
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
	);
}

export function EditUser({ userToUpdate }: { userToUpdate: UserToUpdate }) {
	const { setStateUserToUpdate } = useUpdate();

	const updateProperty = (
		event: React.ChangeEvent<HTMLInputElement>,
		propertyToUpdate: keyof UserWithId,
	) => {
		if (userToUpdate) {
			setStateUserToUpdate([
				{ ...userToUpdate, [propertyToUpdate]: event.target.value },
			]);
		}
	};

	return (
		<>
			<TableCell className="flex items-center gap-[.5rem]">
				<ProfileImage user={userToUpdate} />
				<TextInput
					name={FORM_NAMES.NAME}
					value={userToUpdate?.name}
					onChange={(event) => updateProperty(event, "name")}
				/>
			</TableCell>
			<TableCell>
				<TextInput
					name={FORM_NAMES.EMAIL}
					value={userToUpdate?.email}
					onChange={(event) => updateProperty(event, "email")}
				/>
			</TableCell>
		</>
	);
}

export function CreateNewUSer() {
	const { handleSubmit, onSubmit, register, errors } = useAddUser();

	return (
		<Card className="mt-[16px]">
			<Title>Create New User</Title>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="space-y-2">
					<label className="flex w-full">
						<input
							type="text"
							{...register("name")}
							className="text-black"
							placeholder="Aquí va el nombre"
						/>
						{errors.name && <span> {errors.name.message}</span>}
					</label>
					<label className="flex">
						<input
							type="email"
							{...register("email")}
							className="text-black"
							placeholder="Aquí va el email"
						/>
						{errors.email && <span> {errors.email.message}</span>}
					</label>
					<label className="flex">
						<input
							type="text"
							{...register("github")}
							className="text-black"
							placeholder="Aquí va el github"
						/>
						{errors.github && <span> {errors.github.message}</span>}
					</label>
					<div>
						<Button type="submit" className="mt-[16px]">
							Crear usuario
						</Button>
					</div>
				</div>
			</form>
		</Card>
	);
}