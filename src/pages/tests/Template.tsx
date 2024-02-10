import React from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";

import GlobalStyles from "../../globalStyles";
import * as Theme from "../../theme";

const Template = ({ children }: React.PropsWithChildren) => {
	return (
		<BrowserRouter>
			<ThemeProvider theme={Theme}>
				<GlobalStyles />
				{children}
			</ThemeProvider>
		</BrowserRouter>
	);
};

export default Template;
