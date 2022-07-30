import React, {useContext} from 'react';
import {Navigate, Routes, Route} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router";
import {AuthContext} from "../context";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
	const {isAuth, isLoading} = useContext(AuthContext);
	console.log(isAuth)

	if (isLoading) {
		return <Loader/>
	}
	return (
		isAuth
			?
				<Routes>
					{privateRoutes.map(route =>
						<Route
							component={route.component}
							path={route.path}
							exact={route.exact}
							key={route.path}
						/>
					)}
					  
					<Navigate to='/posts'/>
				</Routes>

			:
				<Routes>
	 				{publicRoutes.map(route =>
		  				<Route
							component={route.component}
							path={route.path}
							exact={route.exact}
							key={route.path}
		  				/>
	 				)}

	 				<Navigate to='/login'/>
				</Routes>
	);
};

export default AppRouter;