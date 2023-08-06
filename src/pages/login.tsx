import React, { ChangeEventHandler, Component, FormEventHandler } from "react";
import { toast } from "react-hot-toast";
import { Auth } from "services";
import { IEntity } from "types";
import { setSession } from "utils";

interface LoginState {
	username: string;
	password: string;
}

interface LoginProps {
	onLogin: (user: IEntity.User) => void;
}

export default class Login extends Component<LoginProps, LoginState> {
	state: LoginState = {
		username: "",
		password: "",
	};

	handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
		const key = target.name as keyof LoginState;
		const value = target.value as string;

		this.setState({ [key]: value } as unknown as LoginState);
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
			const { data } = await Auth.Login(this.state);
			const accessToken = data.data;

			setSession(accessToken);

			const { data: user } = await Auth.GetMe({ accessToken });
			this.props.onLogin(user);
		} catch (err: any) {
			toast.error(err?.response?.data);
		}
	};

	render() {
		const { username, password } = this.state;
		return (
			<main className="container">
				<div>
					<h1>Login</h1>
					<form onSubmit={this.handleSubmit}>
						{this.renderInput("username", "Username", username, "email")}
						{this.renderInput("password", "Password", password, "password")}
						<button className="btn btn-primary">Login</button>
					</form>
				</div>
			</main>
		);
	}
}
