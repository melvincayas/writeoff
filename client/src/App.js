import { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { userActions } from "./store/user/user-slice";
import { listsActions } from "./store/lists/lists-slice";
import { reloadUser } from "./store/user/user-actions";
import { getUserLists } from "./store/lists/list-actions";

import Layout from "./components/Wrappers/Layout";
import AuthenticatedRoutes from "./components/Wrappers/AuthenticatedRoutes";
import Auth from "./components/Auth/Auth";
import ClientView from "./components/ClientView/ClientView";

import "./App.css";

const App = () => {
	const isLoggedIn = useSelector(state => state.user.isLoggedIn);
	const dispatch = useDispatch();

	useEffect(() => {
		if (localStorage.getItem("session_id")) {
			dispatch(reloadUser());
		}

		return () => {
			dispatch(userActions.logout());
		};
	}, [dispatch]);

	useEffect(() => {
		if (localStorage.getItem("session_id")) {
			dispatch(getUserLists());
		}

		return () => {
			dispatch(listsActions.clearAllLists());
		};
	}, [isLoggedIn, dispatch]);

	return (
		<Layout>
			<Switch>
				<Route path="/" component={Auth} exact />
				<AuthenticatedRoutes path="/home" component={ClientView} />
				<Route path="*" render={() => <p>Nothing found!</p>} />
			</Switch>
		</Layout>
	);
};

export default App;
