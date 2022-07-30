import About from "../pages/About";
import Posts from "../pages/Posts";
import PostIDPage from "../pages/PostIDPage";
import Error from "../pages/Error";
import Login from "../pages/Login";

export const privateRoutes = [
	{path: '/about', component: About, exact: true},
	{path: '/posts', component: Posts, exact: true},
	{path: '/posts/:id', component: PostIDPage, exact: true},
	{path: '/error', component: Error, exact: true},
];

export const publicRoutes = [
	{path: '/login', component: Login, exact: true},
];