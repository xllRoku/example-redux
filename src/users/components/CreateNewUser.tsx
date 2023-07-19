import { Button, Card, Title } from "@tremor/react";
import { useAddUser } from "../hooks";
import InputText from "./InputText";

export const FORM_NAMES = {
	NAME: "name",
	EMAIL: "email",
	GITHUB: "github",
};

export const CreateNewUser = () => {
	const { handleSubmit, onSubmit, control } = useAddUser();

	return (
		<Card className="mt-[16px]">
			<Title>Create New User</Title>
			<form onSubmit={handleSubmit(onSubmit)}>
				<InputText
					control={control}
					name={FORM_NAMES.NAME}
					placeholder="Aquí el nombre"
				/>
				<InputText
					control={control}
					name={FORM_NAMES.EMAIL}
					placeholder="Aquí el email"
				/>
				<InputText
					control={control}
					name={FORM_NAMES.GITHUB}
					placeholder="Aquí el usuario de github"
				/>
				<div>
					<Button type="submit" className="mt-[16px]">
						Crear usuario
					</Button>
				</div>
			</form>
		</Card>
	);
};
