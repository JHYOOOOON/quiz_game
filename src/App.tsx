import React from "react";
import styled from "styled-components";

function App() {
	return (
		<Background className="App">
			<Content></Content>
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
