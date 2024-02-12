import React from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import GlobalStyles from "../../globalStyles";
import * as Theme from "../../theme";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

const Template = ({ children }: React.PropsWithChildren) => {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<ThemeProvider theme={Theme}>
					<GlobalStyles />
					{children}
				</ThemeProvider>
			</BrowserRouter>
		</QueryClientProvider>
	);
};

export default Template;
