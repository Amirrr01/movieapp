import { DetailedHTMLProps, SelectHTMLAttributes } from "react";
import { IEntity } from "types";

interface SelectProps
	extends Pick<
		DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>,
		"value" | "name" | "onChange"
	> {
	label: string;
	options: IEntity.Genre[];
}

const Select = ({ options, label, name, ...args }: SelectProps) => (
	<div className="form-group">
		<label htmlFor={name}>{label}</label>
		<select id={name} className="form-select" name={name} {...args}>
			<option value="">--Genre--</option>
			{options.map(({ _id, name }) => (
				<option key={_id} value={_id} children={name} />
			))}
		</select>
	</div>
);

export default Select;
