import React, {
	ChangeEventHandler,
	Component,
	FormEventHandler,
	HTMLInputTypeAttribute,
} from "react";
import { toast } from "react-hot-toast";
import { Genre, Movie } from "services";
import { IEntity } from "types";
import { Input, Loader, Select } from "components";
import { getSession } from "utils";

interface CreateMovieState {
	title: string;
	genreId: string;
	stock: string;
	rate: string;
	genres: IEntity.Genre[];
	isLoading: boolean;
}

interface CreateMovieProps {}

export default class CreateMovie extends Component<CreateMovieProps, CreateMovieState> {
	state: CreateMovieState = {
		title: "",
		genreId: "",
		stock: "",
		rate: "",
		genres: [],
		isLoading: true,
	};

	handleChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = ({ target }) => {
		const key = target.name as keyof CreateMovieState;
		const value = target.value as string;

		this.setState({ [key]: value } as unknown as CreateMovieState);
	};

	renderInput = (
		name: keyof CreateMovieState,
		label: string,
		value: string | number,
		type?: HTMLInputTypeAttribute
	) => <Input {...{ name, label, value, type, onChange: this.handleChange }} />;

	renderSelect = (name: string, label: string, value: string, options: IEntity.Genre[]) => (
		<Select {...{ name, label, value, options, onChange: this.handleChange }} />
	);

	handleSubmit: FormEventHandler = async (e) => {
		e.preventDefault();
		try {
			const { title, stock, rate, genreId } = this.state;
			const { accessToken } = getSession();
			await Movie.Create({
				title,
				genreId,
				numberInStock: +stock,
				dailyRentalRate: +rate,
				accessToken,
			});
			// this.props.onNavigate("/");
		} catch (err: any) {
			toast.error(err?.response?.data);
		}
	};

	async componentDidMount() {
		const { data: genres } = await Genre.List();
		this.setState({ genres, isLoading: false });
	}

	render() {
		const { title, rate, genreId, stock, isLoading, genres } = this.state;

		if (isLoading) return <Loader />;

		return (
			<main className="container">
				<div>
					<h1>Movie [CREATE]</h1>
					<form onSubmit={this.handleSubmit}>
						{this.renderInput("title", "Title", title)}
						{this.renderSelect("genreId", "Movie genre", genreId, genres)}
						{this.renderInput("stock", "Number in stock", stock, "number")}
						{this.renderInput("rate", "Daily rental rate", rate, "number")}
						<button className="btn btn-primary">Create</button>
					</form>
				</div>
			</main>
		);
	}
}
