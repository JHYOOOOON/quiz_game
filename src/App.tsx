import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";

import { Loader } from "./components";
import { Router } from "./Router";

function App() {
	return (
		<Background className="App">
			<Content>
				<BrowserRouter>
					<Suspense fallback={<Loader />}>
						<Router />
					</Suspense>
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
	background-color: ${({ theme }) => theme.colors.white};
`;
