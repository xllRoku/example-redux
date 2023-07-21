import type { PropsWithChildren } from "react";
import { useFormContext } from "react-hook-form";

interface Props extends PropsWithChildren {
	name: string;
}

const InputText: React.FC<Props> = ({ name, ...props }) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<label className="flex w-full">
			<input
				type="text"
				className="text-black"
				{...register(name)}
				{...props}
			/>
			{errors && <span>{errors.root?.message}</span>}
		</label>
	);
};

export default InputText;
