import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface InputProps
	extends Pick<
		DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
		"value" | "name" | "type" | "onChange" | "min" | "max" | "required"
	> {
	label: string;
}

const Input = ({ label, ...args }: InputProps) => (
	<div className="form-group">
		<label htmlFor={args.name}>{label}</label>
		<input className="form-control" id={args.name} {...args} />
	</div>
);

export default Input;
