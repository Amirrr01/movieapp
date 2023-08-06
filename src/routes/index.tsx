import { Login, Home, Register, CreateMovie } from "pages";
import { Navigate, Route, Routes as Switch } from "react-router-dom";
import { IEntity } from "types";

interface RoutesProps {
	onLogin: (user: IEntity.User) => void;
	isAuthenticated: boolean;
}

const Routes = ({ onLogin, isAuthenticated }: RoutesProps) => (
	<Switch>
		<Route path="movies" element={<Home />} />
		<Route
			path="create-movie"
			element={isAuthenticated ? <CreateMovie /> : <Navigate to="/movies" />}
		/>
		<Route path="register" element={isAuthenticated ? <Navigate to="/movies" /> : <Register />} />
		<Route
			path="login"
			element={isAuthenticated ? <Navigate to="/" /> : <Login onLogin={onLogin} />}
		/>
		<Route path="*" element={<Navigate to="/movies" />} />
	</Switch>
);

export default Routes;
