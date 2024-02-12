import React, { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import GlobalStyles from "../../globalStyles";
import * as Theme from "../../theme";
import { MemoryHistory } from "history";
import { BrowserRouter, Router } from "react-router-dom";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

interface ITemplate extends PropsWithChildren {
	history?: MemoryHistory;
}

const Template = ({ children, history }: ITemplate) => {
	if (!!history) {
		return (
			<Router navigator={history} location={history.location}>
				<QueryClientProvider client={queryClient}>
					<ThemeProvider theme={Theme}>
						<GlobalStyles />
						{children}
					</ThemeProvider>
				</QueryClientProvider>
			</Router>
		);
	}

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
