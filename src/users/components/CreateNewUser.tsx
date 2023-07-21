import { Button, Card, Title } from "@tremor/react";
import { useAddUser } from "../hooks";

export const CreateNewUser = () => {
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
};
