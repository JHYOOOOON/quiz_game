import React from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants";
import { Main, Quiz, Result } from "./pages";

export function Router() {
	return (
		<Routes>
			<Route path={ROUTES.MAIN} element={<Main />} />
			<Route path={ROUTES.QUIZ} element={<Quiz />} />
			<Route path={ROUTES.RESULT} element={<Result />} />
		</Routes>
	);
}
