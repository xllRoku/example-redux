import { TextInput } from "@tremor/react";
import { PropsWithChildren } from "react"; // Import PropsWithChildren
import { Controller } from "react-hook-form";
import { ControlInfer } from "../hooks";

interface Props extends PropsWithChildren<any> {
	control: ControlInfer;
	name: any;
	defaultValue?: any;
}

const InputText: React.FC<Props> = ({
	control,
	defaultValue,
	name,
	...props
}) => {
	return (
		<Controller
			render={({ field }) => <TextInput {...field} {...props} />}
			control={control}
			name={name}
			defaultValue={defaultValue}
		/>
	);
};

export default InputText;
