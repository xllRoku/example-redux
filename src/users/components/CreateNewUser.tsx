import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import { If, Then } from "../../functional.component";
import { useAddUser } from "../hooks";

export const FORM_NAMES = {
	NAME: "name",
	EMAIL: "email",
	GITHUB: "github",
};

export const CreateNewUser = () => {
	const { handleSubmit, result } = useAddUser();

	return (
		<Card style={{ marginTop: "16px" }}>
			<Title>Create New User</Title>
			<form onSubmit={handleSubmit}>
				<TextInput name={FORM_NAMES.NAME} placeholder="Aquí el nombre" />
				<TextInput name={FORM_NAMES.EMAIL} placeholder="Aquí el email" />
				<TextInput
					name={FORM_NAMES.GITHUB}
					placeholder="Aquí el usuario de github"
				/>
				<div>
					<Button type="submit" style={{ marginTop: "16px" }}>
						Crear usuario
					</Button>
					<span>
						<If predicate={result === "ok"}>
							<Then predicate>
								<Badge color="green">Guardado correctamente</Badge>
							</Then>
						</If>
						<If predicate={result === "ko"}>
							<Then predicate>
								<Badge color="red">Error con los campos</Badge>
							</Then>
						</If>
					</span>
				</div>
			</form>
		</Card>
	);
};
