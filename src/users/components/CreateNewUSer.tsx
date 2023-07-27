import { useCreateUser } from "../hooks/management";
import { CreateUserInfo } from "../models";

type CreateNewUserProps = {
	create: (user: CreateUserInfo) => void;
};

export function CreateNewUSer({ create }: CreateNewUserProps) {
	const { handleSubmit, onSubmit, register, errors } = useCreateUser(create);

	return (
		<div className="mt-[16px] bg-gray-900 p-6 flex flex-col items-center gap-4">
			<h2 className="text-white text-xl font-bold">Create New User</h2>
			<div className="w-[450px] flex justify-center">
				<form onSubmit={handleSubmit(onSubmit)} className="w-full">
					<div className="space-y-3 px-14">
						<label className="flex w-full flex-col items-start ">
							<input
								type="text"
								{...register("name")}
								className={`${
									errors.name?.message ? "border-2 border-red-500" : " "
								} w-full h-8 px-2 rounded-full text-black  border-red-500`}
								placeholder="Aquí va el nombre"
							/>
							{errors.name && (
								<span className="text-red-500 px-2 rounded-full">
									{" "}
									{errors.name.message}
								</span>
							)}
						</label>
						<label className="flex w-full flex-col items-start">
							<input
								type="email"
								{...register("email")}
								className={`${
									errors.email?.message ? "border-2 border-red-500" : " "
								} w-full h-8 px-2 rounded-full text-black  `}
								placeholder="Aquí va el email"
							/>
							{errors.email && (
								<span className=" text-red-500 px-2 rounded-full">
									{errors.email.message}
								</span>
							)}
						</label>
						<label className="flex w-full flex-col items-start">
							<input
								type="text"
								{...register("github")}
								className={`${
									errors.github?.message ? "border-2 border-red-500" : " "
								} w-full h-8 px-2 rounded-full text-black  border-red-500`}
								placeholder="Aquí va el github"
							/>
							{errors.github && (
								<span className=" text-red-500 px-2 rounded-full">
									{" "}
									{errors.github.message}
								</span>
							)}
						</label>
						<div className="mt-[16px]">
							<button
								type="submit"
								className="h-10 px-2 rounded-full font-bold bg-green-800  text-white"
							>
								Crear usuario
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
