import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import styled from "styled-components";

import { Main, Note } from "./pages";
import { ROUTES } from "./constants";

function App() {
	return (
		<Background className="App">
			<Content>
				<BrowserRouter>
					<Routes>
						<Route path={ROUTES.MAIN} element={<Main />} />
						<Route path={ROUTES.NOTE} element=<Note /> />
					</Routes>
				</BrowserRouter>
			</Content>
		</Background>
	);
}

export default App;

const Background = styled.div`
	width: 100%;
	height: 100%;
	background-color: ${({ theme }) => theme.colors.gray100};
`;

const Content = styled.main`
	width: 100%;
	height: 100%;
	max-width: 500px;
	min-width: 320px;
	margin: 0 auto;
	padding: 10px 15px;
	background-color: ${({ theme }) => theme.colors.white};
`;
