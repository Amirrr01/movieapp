import http from "./http";
import { IApi } from "types";
import config from "config";

export const List = () => http.get<IApi.Movie.List.Response>("/movies");

export const Single = ({ movieID }: IApi.Movie.Single.Request) =>
	http.get<IApi.Movie.Single.Response>(`/movies/${movieID}`);

export const Create = ({ accessToken, ...body }: IApi.Movie.Create.Request) =>
	http.post<IApi.Movie.Create.Response>(`/movies`, body, {
		headers: { [config.api.tokenKEY]: accessToken },
	});
