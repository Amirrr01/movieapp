import { ChangeEventHandler, Component, FormEventHandler } from "react";
import { toast } from "react-hot-toast";
import { Auth } from "services";

interface RegisterState {
	username: string;
	name: string;
	password: string;
}

interface RegisterProps {}

export default class Register extends Component<RegisterProps, RegisterState> {
	state: RegisterState = { username: "", name: "", password: "" };

	handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
		const name = target.name as keyof RegisterState;
		const value = target.value as string;

		this.setState({ [name]: value } as unknown as RegisterState);
	};

	renderInput = (name: string, label: string, value: string, type = "text") => {
		return (
			<div className="form-group">
				<label htmlFor={name}>{label}</label>
				<input
					type={type}
					id={name}
					name={name}
					className="form-control"
					value={value}
					onChange={this.handleChange}
				/>
			</div>
		);
	};

	handleSubmit: FormEventHandler = async (e) => {
		e.preventDefault();
		try {
			await Auth.Register(this.state);
			// this.props.onNavigate("/login");
			toast.success("Successfully registered.");
		} catch (err: any) {
			toast.error(err?.response?.data);
		}
	};

	render() {
		const { username, name, password } = this.state;
		return (
			<main className="container">
				<div>
					<h1>Register</h1>
					<form onSubmit={this.handleSubmit}>
						{this.renderInput("username", "Username", username, "email")}
						{this.renderInput("name", "Name", name)}
						{this.renderInput("password", "Password", password, "password")}
						<button className="btn btn-primary">Register</button>
					</form>
				</div>
			</main>
		);
	}
}
