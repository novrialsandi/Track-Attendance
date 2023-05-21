import { Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ContentPage from "../pages/ContentPage";
import LogPage from "../pages/LogPage";

const routes = [
	<Route path="/" element={<ContentPage />}></Route>,
	<Route path="/login" element={<LoginPage />}></Route>,
	<Route path="/register" element={<RegisterPage />}></Route>,
	<Route path="/log" element={<LogPage />}></Route>,
];

export default routes;
