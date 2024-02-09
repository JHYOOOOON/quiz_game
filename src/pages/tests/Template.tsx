import React from "react";
import { ThemeProvider } from "styled-components";

import GlobalStyles from "../../globalStyles";
import * as Theme from "../../theme";

const Template = ({ children }: React.PropsWithChildren) => {
	return (
		<ThemeProvider theme={Theme}>
			<GlobalStyles />
			{children}
		</ThemeProvider>
	);
};

export default Template;
