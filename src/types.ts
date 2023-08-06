export namespace IEntity {
	export interface Movie {
		_id: string;
		title: string;
		genre: Genre;
		numberInStock: number;
		dailyRentalRate: number;
		username: string;
		isLiked: boolean;
	}

	export interface Genre {
		_id: string;
		name: string;
	}

	export interface Sort {
		path: keyof Movie;
		order: "asc" | "desc";
	}

	export type User = {
		_id: string;
		name: string;
		email: string;
		isAdmin: boolean;
	} | null;
}

export namespace IApi {
	export namespace Genre {
		export namespace List {
			export interface Request {}
			export type Response = IEntity.Genre[];
		}

		export namespace Single {
			export interface Request extends Params {}
			export interface Params {
				genreID: string;
			}
			export type Response = IEntity.Genre;
		}
	}

	export namespace Movie {
		export namespace List {
			export interface Request {}
			export type Response = IEntity.Movie[];
		}

		export namespace Single {
			export interface Request extends Params {}

			export interface Params {
				movieID: string;
			}

			export type Response = IEntity.Movie;
		}

		export namespace Create {
			export interface Request extends Params {}

			export interface Params {
				title: string;
				genreId: string;
				numberInStock: number;
				dailyRentalRate: number;
				accessToken: string;
			}

			export type Response = IEntity.Movie;
		}
	}

	export namespace Auth {
		export namespace Login {
			export interface Request extends Params {}

			export interface Params {
				username: string;
				password: string;
			}

			export interface Response {
				data: string;
			}
		}

		export namespace Register {
			export interface Request extends Params {}

			export interface Params {
				name: string;
				username: string;
				password: string;
			}

			export interface Response {
				_id: string;
				name: string;
				email: string;
			}
		}

		export namespace GetMe {
			export interface Request extends Params {}

			export interface Params {
				accessToken: string;
			}

			export type Response = IEntity.User;
		}
	}
}
